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

// GET project by id
router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const project = await Projects.get(id);
    if (project) {
      res.status(201).json(project);
    } else {
      res.status(404).json({error: 'The project with that id does not exist.'});
    }
  } catch (err) {
    res.status(500).json({err: 'The project could not be retrieved.'})
  }
})

// GET project's actions
router.get('/:id/actions', async (req, res) => {
  try {
    const {id} = req.params;
    const projActions = await Projects.getProjectActions(id);  
    if (projActions > 0) {
      res.status(200).json(projActions);
    } else {
      res.status(404).json({err: "The project associated with the specified ID does not exist."})
    }
  } catch (error) {
    res.status(500).json({err: "There was an error retrieving the project's actions."})
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

// DELETE project
router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const projectDelete = await Projects.remove(id);
    if (projectDelete) {
      res.status(200).json({deletedMessage: projectDelete});
    } else {
      res.status(404).json({err: 'The project associated with the specified ID was not found.'})
    }
  } catch (err) {
    res.status(500).json({err: 'The project failed to delete.'});
  }
})

//UPDATE, or edit, the project name and/or description
router.put('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const updatedProj = req.body;
    const project = await Projects.update(id, req.body);
    if (project){
      if (updatedProj.name && updatedProj.description) {
        res.status(200).json({updatedProject: project});
      } else {
        res.status(400).json({err: "Please provide updated name and description for project"});
      }
    } else {
      res.status(404).json({message: "The project with the specified ID does not exist."});
    }
  } catch (err) {
    res.status(500).json({err: "Project failed to udpate."})
  }
})

module.exports = router;