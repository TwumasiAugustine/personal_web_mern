const express = require('express');
const router = express.Router();
const { AddProject, GetProjects, UploadProject, DeleteProject } = require('../controller/projectController');

router.post('/dashboard/project', UploadProject.single('image'), AddProject);
router.get('/dashboard/project', GetProjects);
router.post('/dashboard/project/:id', DeleteProject)


module.exports = router;