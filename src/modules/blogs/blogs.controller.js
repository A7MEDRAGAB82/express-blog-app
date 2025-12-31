const express = require('express')


const {addBlog , getAllBlogs , getUserBlogs , updateBlog , deleteBlog} = require("./blogs.service")

const router = express.Router()


router.post("/add-blog", addBlog );

router.get("/get-all-blogs",getAllBlogs);

router.get("/get-user-blogs/:userId", getUserBlogs);

router.patch("/update-blog/:blogId",updateBlog );

router.delete("/delete-blog/:blogId", deleteBlog);

module.exports = router