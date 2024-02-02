const { Thought } = require('../models');

const thoughtController = {
 getAllThoughts: async (req, res) => {
    try {
      console.log('Getting all thoughts...');
      const thoughts = await Thought.find();
      console.log('Thoughts retrieved:', thoughts);
      res.json(thoughts);
    } catch (error) {
      console.error('Error getting all thoughts:', error);
      res.status(500).json(error);
    }
 },

 getThoughtById: async (req, res) => {
    try {
      console.log(`Getting thought by ID: ${req.params.thoughtId}`);
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        console.log('Thought not found');
        return res.status(404).json({ message: 'Thought not found' });
      }
      console.log('Thought retrieved:', thought);
      res.json(thought);
    } catch (error) {
      console.error('Error getting thought by ID:', error);
      res.status(500).json(error);
    }
 },

 createThought: async (req, res) => {
    try {
      console.log('Creating new thought...');
      const newThought = await Thought.create(req.body);
      console.log('New thought created:', newThought);
      res.status(201).json(newThought);
    } catch (error) {
      console.error('Error creating thought:', error);
      res.status(400).json(error);
    }
 },

 updateThought: async (req, res) => {
    try {
      console.log(`Updating thought with ID: ${req.params.thoughtId}`);
      const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
      if (!updatedThought) {
        console.log('Thought not found');
        return res.status(404).json({ message: 'Thought not found' });
      }
      console.log('Thought updated:', updatedThought);
      res.json(updatedThought);
    } catch (error) {
      console.error('Error updating thought:', error);
      res.status(400).json(error);
    }
 },

 deleteThought: async (req, res) => {
    try {
      console.log(`Deleting thought with ID: ${req.params.thoughtId}`);
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!deletedThought) {
        console.log('Thought not found');
        return res.status(404).json({ message: 'Thought not found' });
      }
      console.log('Thought deleted successfully');
      res.json({ message: 'Thought deleted successfully' });
    } catch (error) {
      console.error('Error deleting thought:', error);
      res.status(500).json(error);
    }
 },

 createReaction: async (req, res) => {
    try {
      console.log(`Creating reaction for thought with ID: ${req.params.thoughtId}`);
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true }
      );
      if (!updatedThought) {
        console.log('Thought not found');
        return res.status(404).json({ message: 'Thought not found' });
      }
      console.log('Reaction created:', updatedThought);
      res.json(updatedThought);
    } catch (error) {
      console.error('Error creating reaction:', error);
      res.status(400).json(error);
    }
 },

 deleteReaction: async (req, res) => {
    try {
      console.log(`Deleting reaction with ID: ${req.body.reactionId} from thought with ID: ${req.params.thoughtId}`);
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.body.reactionId } } },
        { new: true }
      );
      if (!updatedThought) {
        console.log('Thought not found');
        return res.status(404).json({ message: 'Thought not found' });
      }
      console.log('Reaction deleted:', updatedThought);
      res.json(updatedThought);
    } catch (error) {
      console.error('Error deleting reaction:', error);
      res.status(400).json(error);
    }
 }
};

module.exports = thoughtController;