const { Thought } = require('../models/Thought.js');
const { User } = require('../models/User.js');

const thoughtController = {
    // get all thoughts
    async getThoughts(req, res) {
      try {
        const thoughtData = await Thought.find()
          .sort({ createdAt: -1 });
  
        res.status(200).json(thoughtData);
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

        res.status(200).json(thoughtData);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // create a thought by
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

        res.status(200).json({ message: 'Thought has been created' });
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // delete thought
    async deleteThought(req, res) {
      try {
        const thoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId })

        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought found' });
        }

        // remove thought id from user's `thoughts` field
        const userData = User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );

        if (!userData) {
          return res.status(404).json({ message: 'Thought created but no user with this id!' });
        }

        res.status(200).json({ message: 'Thought deleted' });
      } catch (err) {
        res.status(500).json(err);
      }
    },
     // update thought
    async updateThought(req, res) {
      try {
      const thoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });

      if (!thoughtData) {
        return res.status(404).json({ message: 'No thought found' });
      }

      res.status(200).json(thoughtData);
    }   
    catch (err) {
      res.status(500).json(err);
    }
    },
    // add a reaction to a thought
    async addReaction(req, res) {
      try {
        const dbThoughtData = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        );

        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }

        res.json(dbThoughtData);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // remove reaction from a thought
    async deleteReaction(req, res) {
      try {
        const dbThoughtData = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        );

        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }

        res.json(dbThoughtData);
      } catch (err) {
        res.status(500).json(err);
      }
    },

  };
  
  module.exports = thoughtController;
  