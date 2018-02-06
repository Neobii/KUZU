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
  ////parser.recur().on(date).fullDate();
  //add all autostart to meteor
})

App.addAutoStartShow = function(showId){
  var show = Shows.findOne({_id: showId});
  SyncedCron.add({
    name: 'AutoStart Show: ' + show.showName,
    schedule: function(parser) {
      return parser.recur().on(show.showStart).fullDate();
    },
    job: function() {
      Show.update({_id: show._id}, {$set: {isActive: false}}, {multi: true})
      Show.update({_id: show._id}, {$set: {isActive: true}})
    }
  });
  SyncedCron.add({
    name: 'AutoEnd Show: ' + show.showName,
    schedule: function(parser) {
      return parser.recur().on(show.showEnd).fullDate();
    },
    job: function() {
      Show.update({_id: show._id}, {$set: {isActive: false}})
    }
  });
  SyncedCron.start();
}

App.removeAutoStartShow = function(){
  
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



