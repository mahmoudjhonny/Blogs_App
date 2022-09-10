const Blog = require("../models/BlogSchema");
const Blogs = require("../models/BlogSchema");

const renderHome = (req, res, next) => {
  Blogs.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      console.log(result);
      res.render("index", { result: result, title: "Home" });
    })
    .catch((err) => console.log(err));
};

const renderAddblogs = (req, res, next) => {
  res.render("add-blog", { title: "add Blog" });
};

const renderAbout = (req, res, next) => {
  res.render("about", { title: "About Us" });
};

const renderDetails = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      console.log(result);
      res.render("details", { title: result.title, blog: result });
    })
    .catch((err) => console.log(err));
};

const addBlogs = (req, res) => {
  const blog = new Blogs(req.body);
  blog
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  renderHome,
  renderAddblogs,
  renderAbout,
  renderDetails,
  addBlogs,
};
