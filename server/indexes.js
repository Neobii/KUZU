Meteor.startup(() => {
  Shows.rawCollection().createIndex({userId: 1, showName: 1, showStart: -1});
  Shows.rawCollection().createIndex({showName: 1, showStart: -1});
  Shows.rawCollection().createIndex({showStart: -1});
  Tracklists.rawCollection().createIndex({playDate:-1});
  Tracklists.rawCollection().createIndex({showId:1});
})