 Meteor.publish('TrackLists', ()=>{
    return Tracklists.find({});
  });

 Meteor.publish('singleTrack',(trackId)=>{
 	check(trackId, String);
 	return Tracklists.find({_id: trackId});
 });

 Meteor.publish('showList',()=>{
 	return Shows.find({});
 })