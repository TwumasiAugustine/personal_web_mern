const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PostSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		summary: {
			type: String,
			required: true,
			trim: true,
		},
		content: {
			type: String,
			required: true,
		},
		thumbnail: {
			type: String,
		},
		path: {
			type: String,
		},
		author: {
			type: String
		},
		comments: [
			{
				user: {
					type: Schema.Types.ObjectId,
					ref: 'User',
					required: true,
				},
				text: {
					type: String,
					required: true,
					trim: true,
				},
				createdAt: {
					type: Date,
					default: Date.now,
				},
				updatedAt: {
					type: Date,
					default: Date.now,
				},
			},
		],
		likes: [
			{
				user: {
					type: Schema.Types.ObjectId,
					ref: 'User',
				},
			},
		],
	},
	{
		timestamps: true,
	},
);

PostSchema.pre('save', function (next) {
	if (this.isModified('comments')) {
		this.comments.forEach((comment) => {
			if (comment.isModified('text')) {
				comment.updatedAt = Date.now();
			}
		});
	}
	next();
});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;
