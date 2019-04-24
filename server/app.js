const express = require("express");
const path = require("path");
const app = express();
const settings = require("./settings/config");
const users = require("./routes/users");
var minifyHTML = require("express-minify-html");

app.use("/users", users);
app.set("views", "../landing");

app.use(
  minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true
    }
  })
);

app.use(express.static(path.join(__dirname, "../landing")));
app.get("/", (req, res) => {
  res.render("views");
});

app.use(express.static(path.join(__dirname, "../build")));
app.get("/app", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(process.env.PORT || settings.PORT, () => {
  console.log(`App is listening on port: ${process.env.PORT || settings.PORT}`);
});
