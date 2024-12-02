const express = require('express');
const router = express.Router();
const {
	PostBlog,
	UpdatePost,
	DeletePost,
	UploadFile,
	GetBlogPosts,
	GetPostById,
	AddComment,
	LikePost,
	GetComments,
	GetLikeCount,
} = require('../controller/postController');
const authenticate = require('../middleware/authMiddleware');
// Post blog route
router.post(
	'/blog/create',
	authenticate(['user', 'admin']),
    UploadFile.single('thumbnail'),
	PostBlog,
);
// Get blog route
router.get('/blog/posts', GetBlogPosts);

// Get blog by id route
router.get('/blog/post/:id', GetPostById);
// update post by id
router.put('/blog/post/:id',  UpdatePost);
// Delete post by id

router.delete('/blog/post/:id',  DeletePost);
// Add comment route
router.post('/blog/post/:id/comment', authenticate('user', 'admin'), AddComment);

// Like post route
router.post('/blog/post/:id/like', authenticate(['user', 'admin']), LikePost);

// Get comments route
router.get('/blog/post/:id/comments', GetComments);

// Get like count route

router.get('/blog/post/:id/like-count', GetLikeCount);

module.exports = router;
