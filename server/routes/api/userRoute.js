const { User } = require('../../models/User.js');

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
      const userData = await User.create(req.body);
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a user
  async updateUser(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
          $set: req.body,
        },
        {
          runValidators: true,
          new: true,
        }
      );

      if (!userData) {
        return res.status(404).json({ message: 'No user found' });
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete user
  async deleteUser(req, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.userId })

      if (!userData) {
        return res.status(404).json({ message: 'No user found' });
      }
      res.status(200).json({ message: 'User has been deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add friend to the friend list
  async addFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });

      if (!userData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // remove friend from friend list
  async removeFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });

      if (!userData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.status(200).json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

}

module.exports = userController;