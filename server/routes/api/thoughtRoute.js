const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    async getThoughts(req, res) {
      try {
        const thoughtData = await Thought.find()
          .sort({ createdAt: -1 });
  
        res.json(thoughtData);
      } catch (err) {
        res.status(500).json(err);
      }
    },
     // get thought by id
    async getThought(req, res) {
      try {
        const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });

        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought was found' });
        }

        res.json(thoughtData);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // create a thought
    async createThought(req, res) {
      try {
        const thoughtData = await Thought.create(req.body);

        const userData = await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );

        if (!userData) {
          return res.status(404).json({ message: 'Thought created but no user with this id!' });
        }

        res.json({ message: 'Thought has been created' });
      } catch (err) {
        res.status(500).json(err);
      }
    },

  };
  
  module.exports = thoughtController;
  