const db = require("../config/connection");
const { User, Rock } = require("../models");
const userSeeds = require("./userSeeds.json");

db.once("open", async () => {
  await User.deleteMany({});
  await User.create(userSeeds);

  console.log("Success! ");
  process.exit(0);
});
