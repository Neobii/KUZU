ShowSeeds = new Mongo.Collection("showSeeds");

ShowSeeds.attachSchema({
  name: {
    type: String,
    label: "Show seed name"
  },
  ownerId: {
    type: String,
    label: "Owner",
    //autoform search for users ??
  }
})