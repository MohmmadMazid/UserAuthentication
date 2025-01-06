const express = require("express");
const app = express();
const port = 8080;
const Path = require("path");
const ejs = require("ejs");
app.use(express.static(Path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.set("view-engine", "ejs");
app.set("views", Path.join(__dirname, "/views"));
const mongoose = require("mongoose");

main()
  .then((res) => {
    console.log("backend connected suucessfully");
  })
  .catch((err) => {
    console.log("some error accured during connection making");
  });

async function main() {
  //   await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

app.get("/home", (req, res) => {
  res.send("this is the home route");
});

app.listen(port, () => {
  console.log("app is working on route 8080");
});
