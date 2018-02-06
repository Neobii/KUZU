/*
SyncedCron.add({
  name: 'Crunch some important numbers for the marketing department',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('every 2 hours');
  },
  job: function() {
    var numbersCrunched = CrushSomeNumbers();
    return numbersCrunched;
  }
});
*/

Meteor.startup(function(){
  SyncedCron.stop();
  ////parser.recur().on(date).fullDate();
  //add all autostart to meteor
})

App.addAutoStartShow = function(showId){
  var show = Shows.findOne({_id: showId});
  SyncedCron.add({
    name: 'AutoStart_' + show._id,
    schedule: function(parser) {
      return parser.recur().on(show.showStart).fullDate();
    },
    job: function() {
      Shows.update({_id: show._id}, {$set: {isActive: false}}, {multi: true})
      Shows.update({_id: show._id}, {$set: {isActive: true}});
      Meteor.call("autoplayNextTrack");
    }
  });
  SyncedCron.add({
    name: 'AutoEnd_' + show._id,
    schedule: function(parser) {
      return parser.recur().on(show.showEnd).fullDate();
    },
    job: function() {
      Shows.update({_id: show._id}, {$set: {isActive: false, autoStartEnd: false}})
    }
  });
  SyncedCron.start();
}

App.removeAutoStartShow = function(showId){
  SyncedCron.remove("AutoStart_" + showId);
  SyncedCron.remove("AutoEnd_" + showId);
}

Meteor.methods({
  addAutoStartShow(showId){
    App.addAutoStartShow(showId);
    Shows.update({_id: showId}, {$set: {autoStartEnd: true}})
  },
  removeAutoStartShow(showId){
    App.removeAutoStartShow(showId);
    Shows.update({_id: showId}, {$set: {autoStartEnd: false}})
  }
})



