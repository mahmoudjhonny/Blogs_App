const express = require("express");
const blogs_controller = require("../controllers/blogs");

const router = express.Router();

router.get("/", blogs_controller.renderHome);

router.get("/add-blog", blogs_controller.renderAddblogs);

router.get("/about", blogs_controller.renderAbout);

router.get("/:id", blogs_controller.renderDetails);

router.post("/add-blog", blogs_controller.addBlogs);

module.exports = router;
