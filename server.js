const express = require("express");
const mongoose = require("mongoose");
const db = require("models");
const cheerio = require("cheerio");
const exphbs = require("express-handlebars");
const router = require("./routes/api-routes");
const router = require("./routes/api-routes");
const path = require("path");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static(path.join(__dirname, "/public")));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/", router);

app.listen(PORT, () => {
  console.log("App listening on PORT http://localhost:" + PORT);
});
