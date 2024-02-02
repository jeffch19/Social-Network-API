const express = require('express');
const router = express.Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../controllers/thoughtController');

// Routes for Thoughts
router.get('/', getAllThoughts);
router.get('/:thoughtId', getThoughtById);
router.post('/', createThought);
router.put('/:thoughtId', updateThought);
router.delete('/:thoughtId', deleteThought);
router.post('/:thoughtId/reactions', createReaction);
router.delete('/:thoughtId/reactions', deleteReaction);

module.exports = router;
