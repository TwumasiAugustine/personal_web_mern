const express = require('express');
const router = express.Router();
const { AddProject, GetProjects, UploadProject, DeleteProjectById, UpdateProject,
    GetProjectById
} = require('../controller/projectController');


router.post('/project', UploadProject.single('image'), AddProject);
router.get('/project', GetProjects);
router.delete('/project/:id', DeleteProjectById);
router.get('/project/:id', GetProjectById);
router.put('/project/:id', UploadProject.single('image'), UpdateProject);



module.exports = router;