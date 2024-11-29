const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Project = require('../model/ProjectModel');

const UploadProject = multer({ dest: 'uploads/' });

const AddProject = async (req, res) => {

    try{    
    const { title, description, url, tags } = req.body;
    const image = req.file;

    if (!title || !description || !url || !tags) {
        
        return res
        .status(400)
        .json({message: 'All fields are required'})
    }
    if (image.size > 1024 * 1024 * 5) {
			return res.status(400).json({ message: 'File size exceeds 5MB.' });
		}

		const filename = path.basename(image.originalname);
		const uploadDir = path.dirname(image.path);
		const newFilePath = path.join(uploadDir, filename);
		fs.renameSync(image.path, newFilePath);

        const project = await Project.create({
			title,
			description,
			url,
			tags,
			image: newFilePath,
		});
        res.status(201).json({ message: 'Project created successfully.', project });
	} catch (err) {
		console.error('Error creating project:', err.message);
		res.status(500).json({ message: 'Failed to create project' });
	}

}
//  Get Projects

const GetProjects = async(req, res) => {

    try{
const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * limit;

		const project = await Project.find()
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);

		res.json({
			project,
			currentPage: page,
			totalPages: Math.ceil((await Project.countDocuments()) / limit),
		});
	} catch (err) {
		console.error('Error fetching project:', err.message);
		res.status(500).json({ message: 'Failed to fetch project' });
	}
}

// Delete project by ID
const DeleteProject = async(req, res) => {
    const {id} = req.params;
    try {
		const project = await Project.findByIdAndDelete(id);
		if (!project) {
			return res.status(404).json({ message: 'Project not found' });
		}
		res.json({ message: 'Project deleted successfully' });
	} catch (err) {
		console.error('Error deleting project:', err.message);
		res.status(500).json({ message: 'Failed to delete project' });
	}
}

module.exports = {
    AddProject,
    GetProjects,
    DeleteProject,
    UploadProject
}