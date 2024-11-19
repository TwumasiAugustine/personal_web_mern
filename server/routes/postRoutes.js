const express = require('express');
const router = express.Router();
const {PostBlog, UploadFile, GetBlogPosts} = require('../controller/postController');

// Post blog route
router.post('/blog/create', UploadFile.single('thumbnail'), PostBlog);
// Get blog route
router.get('/blog/posts', GetBlogPosts);

module.exports = router;