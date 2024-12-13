const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Post = require('../model/PostModel');
const { v4: uuidv4 } = require('uuid');

const UploadFile = multer({
	dest: 'uploads/',
	fileFilter: (req, file, cb) => {
		const allowedTypes = [
			'image/jpeg',
			'image/png',
			'image/gif',
			'image/jpg',
			'image/webp',
			'image/avif',
		];
		if (!allowedTypes.includes(file.mimetype)) {
			return cb(
				new Error('Invalid file type. Only images are allowed.'),
				false,
			);
		}
		cb(null, true);
	},
});

const PostBlog = async (req, res) => {
	try {
		const { title, content, summary } = req.body;
		const thumbnail = req.file;

		if (!title || !content || !summary || !thumbnail) {
			return res
				.status(400)
				.json({ message: 'All fields are required.' });
		}

		if (thumbnail.size > 1024 * 1024 * 5) {
			return res.status(400).json({ message: 'File size exceeds 5MB.' });
		}

		const filename = `${uuidv4()}-${thumbnail.originalname}`;
		const uploadDir = path.dirname(thumbnail.path);
		const newFilePath = path.join(uploadDir, filename);

		// Make sure the directory exists
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true });
		}

		// Rename the file asynchronously
		fs.rename(thumbnail.path, newFilePath, (err) => {
			if (err) {
				console.error('Error renaming file:', err);
				return res.status(500).json({ message: 'Error saving file.' });
			}
		});

		const post = await Post.create({
			title,
			content,
			summary,
			author: req.user.username,
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
// Update Post By id
const UpdatePost = async (req, res) => {
	const { id } = req.params;
	const { title, content, summary } = req.body;
	const thumbnail = req.file;

	try {
		const updatedPost = await Post.findByIdAndUpdate(
			id,
			{ title, content, summary },
			{ new: true, runValidators: true },
		);

		if (!updatedPost) {
			return res.status(404).json({ message: 'Post not found' });
		}
		res.status(200).json({
			message: 'Post updated successfully',
			post: updatedPost,
		});
	} catch (error) {
		console.error('Error updating post:', error);
		res.status(500).json({
			message: 'An error occurred while updating the post',
			error: error.message,
		});
	}
};

//  Delete Post by id
const DeletePost = async (req, res) => {
	const { id } = req.params;

	try {
		const post = await Post.findById(id);

		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
		}

		// Delete the image file from the server (if it exists)
		const imagePath = post.path;
		if (fs.existsSync(imagePath)) {
			fs.unlinkSync(imagePath);
		}

		await Post.findByIdAndDelete(id);

		res.json({ message: 'Post and image deleted successfully' });
	} catch (err) {
		console.error('Error deleting post:', err.message);
		res.status(500).json({ message: 'Failed to delete post' });
	}
};

// Search Post
const SearchPosts = async (req, res) => {
	try {
		const { query } = req.query;
		const posts = await Post.find({
			$or: [
				{ title: { $regex: query, $options: 'i' } },
				{ content: { $regex: query, $options: 'i' } },
				{ summary: { $regex: query, $options: 'i' } },
			],
		});
		res.status(200).json(posts);
	} catch (err) {
		console.error('Error searching posts:', err.message);
		res.status(500).json({ message: 'Failed to search posts' });
	}
};
// Add a comment
const AddComment = async (req, res) => {
	const { id } = req.params;
	const { text, name } = req.body;

	if (!name || !text) {
		return res.status(400).json({ message: 'Name and text are required' });
	}

	try {
		const post = await Post.findById(id);
		if (!post) {
			return res.status(404).json({ error: 'Post not found' });
		}

		const comment = {
			name,
			text,
			createdAt: new Date(),
		};

		post.comments.push(comment);
		await post.save();

		res.status(200).json({
			message: 'Comment added successfully',
			comment,
		});
	} catch (err) {
		console.error('Error adding comment:', err);
		res.status(500).json({ error: 'Failed to add comment' });
	}
};

// Get comments for a post
const GetComments = async (req, res) => {
	try {
		const { postId } = req.params;
		const post = await Post.findById(postId).populate(
			'comments.user',
			'username',
		);

		if (!post) return res.status(404).json({ error: 'Post not found' });

		const comments = post.comments.map((comment) => ({
			...comment.toObject(),
			username: comment.user.username,
		}));

		res.status(200).json({ comments });
	} catch (err) {
		res.status(500).json({ error: 'Failed to fetch comments' });
	}
};

// Like a post
const LikePost = async (req, res) => {
	const postId = req.params.id;
	const userId = req.user.id;

	try {
		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({ error: 'Post not found' });
		}

		// Check if the user has already liked the post
		if (post.likes.includes(userId)) {
			return res
				.status(400)
				.json({ error: 'You already liked this post' });
		}

		// Add user to likes
		post.likes.push(userId);
		await post.save();
		res.status(200).json({ message: 'Post liked successfully' });
	} catch (err) {
		res.status(500).json({ error: 'Failed to like the post' });
	}
};

// Get like count
const GetLikeCount = async (req, res) => {
	try {
		const { postId } = req.params;

		const post = await Post.findById(postId);
		if (!post) return res.status(404).json({ error: 'Post not found' });

		res.status(200).json({ likeCount: post.likes.length });
	} catch (err) {
		res.status(500).json({ error: 'Failed to fetch like count' });
	}
};
module.exports = {
	PostBlog,
	UpdatePost,
	DeletePost,
	SearchPosts,
	UploadFile,
	GetBlogPosts,
	GetPostById,
	AddComment,
	GetComments,
	LikePost,
	GetLikeCount,
};
