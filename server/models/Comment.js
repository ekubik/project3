const { Schema, Types } = require("mongoose");
const moment = require("moment");

const commentSchema = new Schema(
  {
    commentId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    commentBody: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 500,
    },
    author: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      default: moment(new Date()).format("DD MMM YYYY hh:mm a"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = commentSchema;
