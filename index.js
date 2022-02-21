//////////////
// IMPORTS //
////////////
const express = require("express");
const exphbs = require("express-handlebars");
const todo = require("./routes/todo");
///////////
// INIT //
/////////
const host = "localhost";
const port = 2000;
const app = express();
app.engine("hbs", exphbs.engine({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
/////////////
// ROUTES //
///////////
app.get("/", (req, res) => {
  res.render("home");
});
app.use("/todo", todo);
//////////
// APP //
////////
app.listen(port, host, () => {
  console.log(`Listening to http://${host}:${port}`);
});
