TrackImports = new Mongo.Collection("trackImports");

TrackImports.attachSchema({
  songTitle: {
    type: String,
    label: "Song Title"
  },
  albumName: {
    type: String,
    label: "Album Name"
  },
  artistName: {
    type: String,
    label: "Artist Name"
  }
})