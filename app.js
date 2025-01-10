const express = require("express");
const app = express();
const port = 8080;
const Path = require("path");
const ejs = require("ejs");
const UserM = require("./model/userSchema");
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
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

app.get("/home", (req, res) => {
  res.render("home.ejs");
});
app.get("/signup", (req, res) => {
  res.render("./signup.ejs");
});

app.post("/signup", async (req, res) => {
  let { username, email, password } = req.body;
  console.log(req.body);
  let user = await UserM.findOne({ username: username });
  if (user) {
    res.send("user exist allready");
  }
  let newUser = new UserM({ username, email, password });
  await newUser.save();
  console.log("user signup successfully");
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.listen(port, () => {
  console.log("app is working on route 8080");
});
