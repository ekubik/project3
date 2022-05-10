const { AuthenticationError } = require('apollo-server-express'); 
const { User, Rock } = require("../models");
const {signToken} = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("rocks");
    },
    rocks: async () => {
      return Rock.find().populate("users");
    },
  },
};

module.exports = resolvers;
