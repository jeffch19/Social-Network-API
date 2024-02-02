const { User, Thought } = require('../models');

const userController = {
 getAllUsers: async (req, res) => {
    try {
      console.log('Getting all users...');
      const users = await User.find().populate('thoughts').populate('friends');
      console.log('Users retrieved:', users);
      res.json(users);
    } catch (error) {
      console.error('Error getting all users:', error);
      res.status(500).json(error);
    }
 },

 getUserById: async (req, res) => {
    try {
      console.log(`Getting user by ID: ${req.params.userId}`);
      const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }
      console.log('User retrieved:', user);
      res.json(user);
    } catch (error) {
      console.error('Error getting user by ID:', error);
      res.status(500).json(error);
    }
 },

 createUser: async (req, res) => {
    try {
      console.log('Creating new user...');
      const newUser = await User.create(req.body);
      console.log('New user created:', newUser);
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(400).json(error);
    }
 },

 updateUser: async (req, res) => {
    try {
      console.log(`Updating user with ID: ${req.params.userId}`);
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      if (!updatedUser) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }
      console.log('User updated:', updatedUser);
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(400).json(error);
    }
 },

 deleteUser: async (req, res) => {
    try {
      console.log(`Deleting user with ID: ${req.params.userId}`);
      const deletedUser = await User.findByIdAndDelete(req.params.userId);
      if (!deletedUser) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }
      console.log('Deleting associated thoughts...');
      await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
      console.log('User and associated thoughts deleted successfully');
      res.json({ message: 'User and associated thoughts deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json(error);
    }
 },

 addFriend: async (req, res) => {
    try {
      console.log(`Adding friend with ID: ${req.params.friendId} to user with ID: ${req.params.userId}`);
      const user = await User.findById(req.params.userId);
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }
      user.friends.push(req.params.friendId);
      await user.save();
      console.log('Friend added successfully');
      res.json(user);
    } catch (error) {
      console.error('Error adding friend:', error);
      res.status(500).json(error);
    }
 },

 deleteFriend: async (req, res) => {
    try {
      console.log(`Deleting friend with ID: ${req.params.friendId} from user with ID: ${req.params.userId}`);
      const user = await User.findById(req.params.userId);
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }
      user.friends.pull(req.params.friendId);
      await user.save();
      console.log('Friend removed successfully');
      res.json(user);
    } catch (error) {
      console.error('Error removing friend:', error);
      res.status(500).json(error);
    }
 }
};

module.exports = userController;