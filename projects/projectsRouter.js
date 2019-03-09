const express = require('express');
const Projects = require('../data/helpers/projectModel');
const router = express.Router();


// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Projects.get();
    res.status(201).json(projects);
  } catch (err) {
    res.status(500).json({err: 'The projects could not be retrieved.'})
  }
})

// POST, or add, new project
router.post('/', async (req, res) => {
  try {
    const newProject = req.body;
    if (newProject.name && newProject.description) {
      const project = await Projects.insert(newProject);
      res.status(201).json({newProject: project});
    } else {
      res.status(400).json({message: 'Please provide name and description of new project.'})
    }
    
  } catch (err) {
    res.status(500).json({err: 'There was a problem adding new project.'});
  }
})



module.exports = router;