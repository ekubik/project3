const { Schema, model} = require("mongoose");
const commentSchema = require("./Comment");

const rockSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    //image: {}
    origin: {
      type: String,
    },
    user: {
      type: String,
      //ref: "User",
    },
    dateCollected: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//commentCount virtual
rockSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

const Rock = model("Rock", rockSchema);

module.exports = Rock;
