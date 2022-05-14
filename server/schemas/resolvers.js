const { AuthenticationError } = require("apollo-server-express");
const { User, Rock } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("rocks");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("rocks").populate("users");
    },
    rocks: async () => {
      return Rock.find();
    },
    rock: async (parent, {rockId}) => {
      return Rock.findOne({_id: rockId});
    },
    myprofile: async(parent, args, context) => {
      if (context.user) { return User.findOne( {_id: context.user._id }).populate("rocks");
    }
    throw new AuthenticationError("You must log in to view your profile")
    }
  },
  Mutation: {
    newUser: async (
      parent,
      { firstName, lastName, username, email, password }
    ) => {
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        password,
      });
      const token = signToken(user);
      return { token, user };
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
    addRock: async (parent, { name, description, dateCollected }, context) => {
      if (context.user) {
        const rock = await Rock.create({
          name,
          description,
          dateCollected,
          user: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { rocks: rock._id } }
        );
        return rock;
      }
      throw new AuthenticationError(
        "You need to be logged in to create a new rock"
      );
    },
    deleteRock: async (parent, { rockId }, context) => {
      if (context.user) {
        const rock = await Rock.findOneAndDelete({
          _id: rockId,
          user: context.user.username,
        });

        await User.findOneAndUpdate(
          {
            _id: context.user._id,
          },
          { $pull: { rocks: rock._id } }
        );
        return rock;
      }
      throw new AuthenticationError("Please log in to delete a rock");
    },
    addComment: async (parent, { rockId, commentBody }, context) => {
      if (context.user) {
        return Rock.findOneAndUpdate(
          {
            _id: rockId,
          },
          {
            $addToSet: {
              comments: { commentBody, author: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteComment: async (parent, { rockId, commentId }, context) => {
      if (context.user) {
        return Rock.findOneAndUpdate(
          { _id: rockId },
          {
            $pull: {
              comments: {
                _id: commentId,
                author: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
