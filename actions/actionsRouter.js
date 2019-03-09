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



module.exports = router;