const db = require("../config/connection");
const { User, Rock } = require("../models");
const userSeeds = require("./userSeeds.json");
const rockSeeds = require("./rockSeeds.json");

db.once("open", async () => {
  try {
    await Rock.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < rockSeeds.length; i++) {
      const { _id, user } = await Rock.create(rockSeeds[i]);
      const owner = await User.findOneAndUpdate(
        { username: user },
        {
          $addToSet: {
            rocks: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("Success!");
  process.exit(0);
});
