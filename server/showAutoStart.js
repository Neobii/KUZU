Meteor.startup(function(){
  SyncedCron.stop();
  var shows = Shows.find({autoStartEnd: true}).fetch();
  _.each(shows, function(show){
    App.addAutoStartShow(show._id);
  })
})



App.addAutoStartShow = function(showId){
  var show = Shows.findOne({_id: showId});
  if(new Date(show.showStart).getTime() > new Date().getTime()){
    var d = moment(show.showStart).subtract(5, "minutes").toDate();
    //xxx check date stuff
    if(d.getTime() > new Date().getTime()) {
      Shows.update({_id: show._id}, {$set: {isArmedForAutoStart: true}});
    }
    else {
      SyncedCron.add({
        name: 'AutoStart_' + show._id,
        schedule: function(parser) {
          var d = moment(show.showStart).subtract(5, "minutes").toDate();
          return parser.recur().on(d).fullDate();
        },
        job: function() {
          Shows.update({_id: show._id}, {$set: {isArmedForAutoStart: true}});
          SyncedCron.remove("AutoStart_" + show._id);
        }
      });
    }
  }
  if(new Date(show.showEnd).getTime() > new Date().getTime()){
    SyncedCron.add({
      name: 'AutoEnd_' + show._id,
      schedule: function(parser) {
        return parser.recur().on(show.showEnd).fullDate();
      },
      job: function() {
        Shows.update({_id: show._id}, {$set: {isActive: false, autoStartEnd: false}});
        SyncedCron.remove("AutoEnd_" + show._id);
        if(App.autoDJTrack && !Shows.findOne({_id: showId, hasRadioLogikTracking: true})) {
          Tracklists.insert({
            artist: App.autoDJTrack.artist,
            songTitle: App.autoDJTrack.songTitle,
            album: App.autoDJTrack.album,
            label: App.autoDJTrack.label,
            trackLength: App.autoDJTrack.duration,
            playDate: App.autoDJTrack.playDate
          })
          delete App.autoDJTrack;
        }
      }
    });
  }
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
    Shows.update({_id: showId}, {$set: {autoStartEnd: false, isArmedForAutoStart: false}})
  }
})



