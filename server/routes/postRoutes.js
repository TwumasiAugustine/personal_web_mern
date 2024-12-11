const express = require('express');
const router = express.Router();
const {
	PostBlog,
	UpdatePost,
	DeletePost,
	SearchPosts,
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

router.get('/blog/posts', GetBlogPosts);
router.get('/blog/post/:id', GetPostById);
router.put('/blog/post/:id',  UpdatePost);
router.delete('/blog/post/:id', DeletePost);
router.get('/blog/search', SearchPosts);
router.post('/blog/post/:id/comment',  AddComment);
router.post('/blog/post/:id/like',  LikePost);
router.get('/blog/post/:id/comments', GetComments);
router.get('/blog/post/:id/like-count', GetLikeCount);

module.exports = router;
