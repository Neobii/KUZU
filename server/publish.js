Meteor.publish(null, function(){
    if(!this.userId){
        return this.ready();
    }
    return Meteor.users.find({_id: this.userId})
});

Meteor.publish(null, function(){
  if(!this.userId){
    return this.ready();
  }
  return ProductionStatuses.find({isActive: true});
})

Meteor.publish('TrackLists', function(){
  return Tracklists.find({}, {limit: 50});
});

Meteor.publish('singleTrack',function(trackId){
	check(trackId, String);
	return Tracklists.find({_id: trackId});
});

Meteor.publish('showTracks',function(showId){
  check(showId, String);
  return Tracklists.find({showId: showId});
});


Meteor.publish('singleShow',function(showId){
  return Shows.find({_id: showId});
});


 Meteor.publish('allProducers',function() {
 	return Meteor.users.find({});
 });

Meteor.publish('oneProducer',function(userId) {
  if(Meteor.user().isAdmin) {
    return Meteor.users.find({});
  } else if( this.userId === userId){
    return Meteor.users.find({_id: userId});
  }
});


Meteor.publish('allShows',function () {
  return Shows.find({});
});

Meteor.publish("showsList", function(){
  var user = Meteor.users.findOne({_id: this.userId});
  if(user.isAdmin) {
    return Shows.find({}, {sort: {showStart: -1}});
  }
  else {
    return Shows.find({userId: this.userId}, {sort: {showStart: -1}});
  }
})

Meteor.publish('activeShow',function(){
  return Shows.find({isActive: true});
})

Meteor.publish('activeShowTracks', function(){
  var activeShow = Shows.findOne({isActive: true});
  if(activeShow) {
    return Tracklists.find({showId: activeShow._id});
  }
  return this.ready();
})
 
Meteor.publish('productionList',function(){
  return ProductionStatuses.find({});
})

Meteor.publish('listenerStats', function(timeFrom, timeTo){
  return ListenerStats.find({fetchDate: {$gte: timeFrom, $lte: timeTo}}, {sort: {"fetchDate": -1}});
})

Meteor.publish('singleProduction',function(productionId){
  return ProductionStatuses.find({_id: productionId});
})

Meteor.publish("featureRequests", function(){
  return FeatureRequests.find({}, {sort: {totalScore: -1}});
})

Meteor.publish("allUsers", function() {
  return Meteor.users.find();
})

Meteor.publish("calendarShows", function(startDate, endDate){
  return Shows.find({showStart: {$gte: startDate, $lte: endDate}}, {sort: {startDate: 1}, fields: {description: 0}})
})

Meteor.publish("posts", function(){
  return Posts.find({}, {sort: {postDate: 1}});
})

Meteor.publish("userMessages", function(){
  return Messages.find({producerId: this.userId});
})

Meteor.publish("showMessages", function(showId){
  return Messages.find({showId: showId})
})