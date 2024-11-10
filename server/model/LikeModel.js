const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		postId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post',
		},
	},
	{ timestamps: true },
);

const LikeModel = model('Like', likeSchema);

module.exports = LikeModel;
