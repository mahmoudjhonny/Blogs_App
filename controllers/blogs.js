const Blog = require("../models/BlogSchema");
const Blogs = require("../models/BlogSchema");

const renderHome = (req, res, next) => {
  Blogs.find()
    .sort({ createdAt: -1 })
    .then((result) => {
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
      res.render("details", { title: result.title, blog: result });
    })
    .catch((err) => console.log(err));
};

const renderEdit = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("edit-blog", { title: "Edit " + result.title, blog: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const addBlogs = (req, res) => {
  const title = req.body.title;
  const snippet = req.body.snippet;
  const Description = req.body.Description;
  const userId = req.user;
  const blog = new Blogs({
    title,
    snippet,
    Description,
    userId,
  });
  blog
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteBlog = (req, res) => {
  const id = req.body.blogId;
  Blog.findByIdAndRemove(id)
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

const editBlog = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const snippet = req.body.snippet;
  const Description = req.body.Description;
  const userId = req.user;
  Blog.findByIdAndUpdate(id, {
    title: title,
    snippet: snippet,
    Description: Description,
    userId: userId,
  })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

module.exports = {
  renderHome,
  renderAddblogs,
  renderAbout,
  renderDetails,
  addBlogs,
  deleteBlog,
  renderEdit,
  editBlog,
};
