AutoDJPlaylists = new Mongo.Collection("autoDJPlaylists");

var showSchedule = new SimpleSchema({
  startTime: {
    type: String,
    label: "Start Time"
  },
  endTime: {
    type: String,
    label: "End Time"
  },
  weekday: {
    type: String,
    defaultValue: "Sunday",
    autoform: {
      options: [
        {label: "Sunday", value: "Sunday"},
        {label: "Monday", value: "Monday"},
        {label: "Tuesday", value: "Tuesday"},
        {label: "Wednesday", value: "Wednesday"},
        {label: "Thursday", value: "Thursday"},
        {label: "Friday", value: "Friday"},
        {label: "Saturday", value: "Saturday"}
      ]
    }
  }
})

AutoDJPlaylists.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Auto DJ Playlist name"
  },
  showSchedules: {
    type: [showSchedule],
    label: "Show Schedules"
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