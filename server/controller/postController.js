const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Post = require('../model/PostModel');

const UploadFile = multer({ dest: 'uploads/' });

const PostBlog = async (req, res) => {
	try {
		const { title, content, summary } = req.body;
		const thumbnail = req.file;

		if (!title || !content || !summary) {
			return res
				.status(400)
				.json({ message: 'All fields are required.' });
		}

		if (thumbnail.size > 1024 * 1024 * 5) {
			return res.status(400).json({ message: 'File size exceeds 5MB.' });
		}

		const filename = path.basename(thumbnail.originalname);
		const uploadDir = path.dirname(thumbnail.path);
		const newFilePath = path.join(uploadDir, filename);
		fs.renameSync(thumbnail.path, newFilePath);

		const post = await Post.create({
			title,
			content,
			summary,
			path: newFilePath,
		});

		res.status(201).json({ message: 'Post created successfully.', post });
	} catch (err) {
		console.error('Error creating post:', err.message);
		res.status(500).json({ message: 'Failed to create post' });
	}
};

const GetBlogPosts = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * limit;

		const posts = await Post.find()
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);

		res.json({
			posts,
			currentPage: page,
			totalPages: Math.ceil((await Post.countDocuments()) / limit),
		});
	} catch (err) {
		console.error('Error fetching posts:', err.message);
		res.status(500).json({ message: 'Failed to fetch posts' });
	}
};

// Get Post by ID with next and prev navigation
const GetPostById = async (req, res) => {
	try {
		const postId = req.params.id;

		const posts = await Post.find().sort({ createdAt: 1 });
		const post = await Post.findById(postId);

		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
		}

		// Find the index of the current post
		const postIndex = posts.findIndex((p) => p._id.toString() === postId);

		// Get the previous and next posts based on the index
		const prevPostId = postIndex > 0 ? posts[postIndex - 1]._id : null;
		const nextPostId =
			postIndex < posts.length - 1 ? posts[postIndex + 1]._id : null;

		// Fetch additional posts (3 most recent posts)
		const additionalPosts = await Post.find()
			.sort({ createdAt: -1 }) 
			.limit(3) 
			.select('_id title summary'); 

		res.json({
			post,
			prevPostId,
			nextPostId,
			additionalPosts, 
		});
	} catch (err) {
		console.error('Error fetching post:', err.message);
		res.status(500).json({ message: 'Failed to fetch post' });
	}
};

module.exports = {
	PostBlog,
	UploadFile,
	GetBlogPosts,
	GetPostById,
};
