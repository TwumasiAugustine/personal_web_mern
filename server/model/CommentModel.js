const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
	{
		content: String,
		postId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post',
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true },
);

const CommentModel = model('Comment', CommentSchema);
module.exports = CommentModel;
