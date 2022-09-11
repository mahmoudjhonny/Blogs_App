const express = require("express");
const blogs_controller = require("../controllers/blogs");

const router = express.Router();

router.get("/", blogs_controller.renderHome);

router.get("/add-blog", blogs_controller.renderAddblogs);

router.get("/about", blogs_controller.renderAbout);

router.get("/:id", blogs_controller.renderDetails);

router.get("/:id/edit-blog", blogs_controller.renderEdit);

router.post("/add-blog", blogs_controller.addBlogs);

router.post("/delete_blog", blogs_controller.deleteBlog);

router.post("/:id/edit-blog", blogs_controller.editBlog);

module.exports = router;
