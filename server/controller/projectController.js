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
		res.status(500).json({ message: 'Failed to fetch project' , error: err.message});
	}
}
// Get project by ID

const GetProjectById = async(req, res) => {
	const {id} = req.params;
	try {
		const project = await Project.findById(id);
		if (!project) {
			return res.status(404).json({ message: 'Project not found' });
		}
		res.json(project);
	} catch (err) {
		console.error('Error fetching project:', err.message);
		res.status(500).json({ message: 'Failed to fetch project' });
	}
}

// Delete project by ID

const DeleteProjectById = async (req, res) => {
	const { id } = req.params;
	try {
		
		const project = await Project.findById(id);
console.log(project)
		if (!project) {
			return res.status(404).json({ message: 'Project not found' });
		}

		// Delete the image file from the server (if it exists)
		const imagePath = project.image; 
		if (fs.existsSync(imagePath)) {
			fs.unlinkSync(imagePath); 
		}

		await Project.findByIdAndDelete(id);

		res.json({ message: 'Project and image deleted successfully' });
	} catch (err) {
		console.error('Error deleting project:', err.message);
		res.status(500).json({ message: 'Failed to delete project' });
	}
};


// Update Project by Id
const UpdateProject = async (req, res) => {
	
	const { id } = req.params;
	const image = req.file;
	const { title, description, url, tags } = req.body;

	if (!title|| !description || !url || !tags) {
		return res.status(400).json({ message: 'All fields are required' });
	}
	
	try {
		const project = await Project.findByIdAndUpdate(id, {
			title,
			description,
			url,
            tags,
            image,
		}, { new: true, runValidators: true });
		
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
		}
		res.json({ message: 'Project updated successfully', project });
	} catch (err) {
		console.error('Error updating project:', err.message);
        res.status(500).json({ message: 'Failed to update project' });
	}
	
}
	
module.exports = {
    AddProject,
    GetProjects,
    DeleteProjectById,
	UploadProject,
	UpdateProject,
	GetProjectById
}