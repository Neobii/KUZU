 Meteor.publish('TrackLists', ()=> {
    return Tracklists.find({});
  });