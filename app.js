const express = require("express");
const mongoose = require("mongoose");
const get_404 = require("./controllers/error").get_404;
const blogs_router = require("./router/blogs");
const User = require("./models/User");

const app = express();

// Set View Engine
app.set("view engine", "ejs");

// Use Static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findById("631ddf6a63be01763e6efe8a") //631ddf6a63be01763e6efe8a
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(blogs_router);

// Connect to DataBase
mongoose
  .connect(
    "mongodb+srv://mahmoud:mahmoud@cluster0.vu6jlts.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("Connected to database");
    User.findOne().then((user) => {
      if (!user) {
        const newUser = new User({
          name: "Mahmoud",
          email: "memo123@gmail.com",
          password: "**************",
        });
        newUser.save();
      }
    });
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(get_404);
