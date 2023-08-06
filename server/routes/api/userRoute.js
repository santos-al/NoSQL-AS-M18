const { User, Thought } = require('../models');

const userController = {
  // get all users
  async getUsers(req, res) {
    try {
      const userData = await User.find()
        .select('-__v')

      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get a user by their id
  async getUser(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('thoughts');

      if (!userData) {
        return res.status(404).json({ message: 'No user found' });
      }

      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

}

const User = model('User', userController);

module.exports = User;