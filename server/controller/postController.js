const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Post = require('../model/PostModel');

const UploadFile = multer({ dest: 'uploads/' });

const PostBlog = async (req, res) => {
	try {
		const { title, content, summary } = req.body;
		const thumbnail = req.file;

		if (!title || !content || !summary ) {
			return res
				.status(400)
				.json({ message: 'All fields are required.' });
		}

		if (thumbnail.size > 1024 * 1024 * 5) {
            return res
                .status(400)
                .json({ message: 'File size exceeds 5MB.' });
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
			author: req.user,
		});

		res.status(201).json({ message: 'Post created successfully.', post });
	} catch (err) {
		console.error('Error creating post:', err.message);
		res.status(500).json({ message: 'Failed to create post' });
	}
};

const GetBlogPosts = async (req, res) => {
	try {
		const posts = await Post.find().sort({ createdAt: -1 });
		res.json(posts);
	} catch (err) {
		console.error('Error fetching posts:', err.message);
		res.status(500).json({ message: 'Failed to fetch posts' });
	}
}
module.exports = {
	PostBlog,
	UploadFile,
	GetBlogPosts
};


