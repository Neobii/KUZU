Meteor.startup(() => {
  Shows._ensureIndex({userId:1, showStart:-1});
  Shows._ensureIndex({showStart:-1});
  Shows._ensureIndex({showName:1, showStart:-1});
  Tracklists._ensureIndex({playDate:-1});
  Tracklists._ensureIndex({showId:1});
})