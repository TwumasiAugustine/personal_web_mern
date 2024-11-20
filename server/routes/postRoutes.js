const express = require('express');
const router = express.Router();
const {PostBlog, UploadFile, GetBlogPosts, GetPostById} = require('../controller/postController');
const auth = require('../middleware/authMiddleware');
// Post blog route
router.post('/blog/create', UploadFile.single('thumbnail'), PostBlog);
// Get blog route
router.get('/blog/posts',  GetBlogPosts);

// Get blog by id route
router.get('/blog/post/:id', GetPostById);

module.exports = router;