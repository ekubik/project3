const { AuthenticationError } = require("apollo-server-express");
const { User, Rock } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("rocks");
    },
    user: async (parent, { username }) => {
      return User.findOne({username}).populate("rocks").populate("users")
    },
    rocks: async () => {
      return Rock.find();
    },
  },
  Mutation: {
    newUser: async (parent, { firstName, lastName, username, email, password}) => {
      const user = await User.create({firstName, lastName, username, email, password});
      const token = signToken(user);
      return {token, user};
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addRock: async (parent, {name, description, dateCollected}, context) => {
      if (context.user) {
        const rock = await Rock.create({
          name,
          description,
          dateCollected,
          user: context.user.username
        });

        await User.findOneAndUpdate({ _id: context.user._id
        },
        {$addToSet: {rocks: rock._id}});
        return rock;
      }
      throw new AuthenticationError("You need to be logged in to create a new rock")
    }
  },
};

module.exports = resolvers;
