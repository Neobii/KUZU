AutoDJPlaylists = new Mongo.Collection("autoDJPlaylists");

AutoDJPlaylists.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Auto DJ Playlist name"
  },
  schedule: {
    type: String,
    label: "Schedule (every first tuesday from 8:00 am - 9:00 pm"
  }
}))

AutoDJPlaylists.allow({
  insert:  (userId,doc)=> {
    return !!userId;
  },
  update: (userId,doc)=> {
    return !!userId;
  },
  remove: (userId, doc)=> {
    return !!userId;
  }
});