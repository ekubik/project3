const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 15,
      match: [/^[A-Za-z0-9]$/],
    },
    bio: {
      type: String,
      maxLength: 200,
    },
    rocks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rock",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//friendCount virtual
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// rockCollection virtual
userSchema.virtual("rockCollection").get(function () {
  return this.rocks.length;
});

//Initialise user model
const User = model("User", UserSchema);

module.exports = User;
