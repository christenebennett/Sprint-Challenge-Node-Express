const express = require('express');
const Actions = require('../data/helpers/actionModel');

const router = express.Router();


// GET all actions
router.get('/', async (req, res) => {
  try {
    const actions = await Actions.get();
    res.status(201).json(actions);
  } catch (err) {
    res.status(500).json({err: 'The actions could not be retrieved.'})
  }
})

// GET action by id
router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const action = await Actions.get(id);
    if (action) {
      res.status(201).json(action);
    } else {
      res.status(404).json({error: 'The action with that id does not exist.'});
    }
  } catch (err) {
    res.status(500).json({err: 'The action could not be retrieved.'})
  }
})

// POST, or add, new action
router.post('/', async (req, res) => {
  try {
    const newAction = req.body;
    if (newAction.project_id && newAction.description && newAction.notes) {
      const action = await Actions.insert(newAction);
      res.status(201).json({newAction: action});
    } else {
      res.status(400).json({message: 'Please provide project ID, description, and notes.'})
    }
  } catch (err) {
    res.status(500).json({err: 'There was a problem adding new action.'});
  }
})

// DELETE action
router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const actionDelete = await Actions.remove(id);
    if (actionDelete){
      res.status(200).json({deletedMessage: actionDelete});
    } else {
      res.status(404).json({message: "The action with the specified ID does not exist."})
    }
  } catch (err) {
    res.status(500).json({err: 'The action failed to delete.'});
  }
})

//UPDATE, or edit, the action name and/or description
router.put('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const updatedAction = req.body;
    const action = await Actions.update(id, req.body);
    if (action){
      if (updatedAction.project_id && updatedAction.description && updatedAction.notes) {
        res.status(200).json({updatedAction: action});
      } else {
        res.status(400).json({err: "Please provide updated name and description for action"});
      }
    } else {
      res.status(404).json({message: "The action with the specified ID does not exist."});
    }
  } catch (err) {
    res.status(500).json({err: "Project failed to udpate."})
  }
})

module.exports = router;