const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const ProjectSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		url: { type: String, required: true },
		tags: { type: String, required: true },
		image: { type: String, required: true },
	},
	{ timestamps: true },
);

const ProjectModel = model('Project', ProjectSchema);
module.exports = ProjectModel;
