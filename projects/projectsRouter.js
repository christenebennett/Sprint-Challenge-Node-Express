const express = require('express');
const Projects = require('../data/helpers/projectModel');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Projects.get();
    res.status(201).json(projects);
  } catch (err) {
    res.status(500).json({err: 'The projects could not be retrieved.'})
  }
})




module.exports = router;