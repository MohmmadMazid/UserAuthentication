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
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const authenticationInitiliaze = require("./authconfig");

const sessionSecret = {
  secret: "mysuper secret",
  resave: false,
  saveUninilialized: true,
  cookie: {
    secure: true,
    maxAge: 24 * 7 * 60 * 60 * 1000,
  },
};

app.use(session(sessionSecret));
app.use(flash());

app.use((req, res, next) => {
  // res.locals.successMsg = req.flash(successMsg);
  // res.locals.failureMsg = req.flash(failureMsg);
  next();
});
authenticationInitiliaze(passport);

app.use(passport.initialize());
app.use(passport.session());

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

const isauthentication = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    res.redirect("/login");
  }
};

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

  //writing the pre save method for the hashing the password

  await newUser.save();
  console.log("user signup successfully");
});

app.get("/login", (req, res) => {
  res.render("./login.ejs");
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("home");
  }
);

app.get("/demo", isauthentication, (req, res) => {
  res.render("./demo.ejs");
});
app.listen(port, () => {
  console.log("app is working on route 8080");
});
