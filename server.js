const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api-routes");
const htmlRoutes = require("./routes/html-routes");
const path = require("path");
const PORT = process.env.PORT || 8080;
const app = express();
app.use("/", htmlRoutes);
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/vogue";

mongoose.connect(MONGODB_URI);

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use("/api", apiRoutes);
app.listen(PORT, () => {
  console.log("App listening on PORT http://localhost:" + PORT);
});
