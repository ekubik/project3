const db = require("../config/connection");
const { User, Rock } = require("../models");
const userSeeds = require("./userSeeds.json");
const rockSeeds = require("./rockSeeds.json");
const { default: mongoose } = require("mongoose");

db.once("open", async () => {
  await Rock.deleteMany({});
  await User.deleteMany({});

  await User.create(userSeeds);

  for (let i = 0; i < rockSeeds.length; i++) {
    try {const result = await Rock.create(rockSeeds[i]);
    //console.log("result", result);
    const rockId = result._id;
    const user = result.user;
    const owner = await User.findOneAndUpdate(
        { username: user },
        {
          $addToSet: {
            rocks: mongoose.Types.ObjectId(rockId),
          },
        }
      );
  
    } catch (err) {
    console.error(err);
    process.exit(1);
  }
  }

  console.log("Success!");
  process.exit(0)})
