const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/BlogSchema");

const app = express();

// Set View Engine
app.set("view engine", "ejs");

// Use Static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.render("index", { title: "Home" });
});

app.get("/add-blog", (req, res, next) => {
  res.render("add-blog", { title: "add Blog" });
});

app.post("/add-blog", (req, res) => {
  const blog = new Blog(req.body);
  console.log(blog);
  blog
    .save()
    .then((result) => {
      res.redirect("/");
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/about", (req, res, next) => {
  res.render("about", { title: "About Us" });
});

// Connect to DataBase
mongoose
  .connect(
    "mongodb+srv://mahmoud:mahmoud@cluster0.vu6jlts.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("Connected to database");
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });

app.use((req, res) => {
  res.status(404).render("404", { title: "Not Found" });
});
