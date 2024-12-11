const mongoose = require('mongoose');
const {  Schema, model } = mongoose;

const commentSchema = new Schema({
    name: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const likeSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


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
		comments: [commentSchema],
        likes: [likeSchema]
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
