const express = require("express");
const mongoose = require("mongoose");
const get_404 = require("./controllers/error").get_404;
const blogs_router = require("./router/blogs");

const app = express();

// Set View Engine
app.set("view engine", "ejs");

// Use Static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(blogs_router);

// Connect to DataBase
mongoose
  .connect(
    "mongodb+srv://mahmoud:mahmoud@cluster0.vu6jlts.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("Connected to database");
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(get_404);
