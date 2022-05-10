const { User, Rock } = require("../models");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("rocks");
    },
    rocks: async () => {
      return Rock.find();
    },
  },
};

module.exports = resolvers;
