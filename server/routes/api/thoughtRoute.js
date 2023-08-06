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

  };
  
  module.exports = thoughtController;
  