var previousTimer;

App.startNextTrack = function(track) {
  var show = Shows.findOne({isActive: true});
  var nextTrack = Tracklists.findOne({showId: show._id, playDate: {$exists: false}}, {sort: {indexNumber: 1}, limit: 1});
  if(nextTrack) {
    Meteor.call("startTrack", nextTrack._id);
  }
  else {
    var showOptions = {isAutoPlaying: false};
    if(show.autoStartEnd) {
      showOptions.autoStartEnd = false;
      showOptions.isActive = false;
      App.fillAutoDJTrack();
    }
    Shows.update({isActive: true}, {$set: showOptions});
  }
}

Meteor.methods({
  startTrack(trackId) {
    var track = Tracklists.findOne({_id: trackId});
    if(track.trackType === "showMeta") {
      Shows.update({_id: track.showId}, {$set: {isShowingDefaultMeta: true}});
    }
    else {
      Shows.update({_id: track.showId}, {$set: {isShowingDefaultMeta: false}});
    }
    Tracklists.update({_id: trackId}, {$set: {playDate: new Date(), isHighlighted:true}});
    var show = Shows.findOne({_id: track.showId});
    if(track.trackLength && show.isAutoPlaying) {
      console.log("setting timer")
      var splitIndex = track.trackLength.indexOf(":");
      var min = track.trackLength.substr(0, splitIndex) || 0;
      var sec = track.trackLength.substr(splitIndex + 1, track.trackLength.length) || 0;
      var trackLengthMillis = ((+min * 60) + +sec) * 1000;
      Meteor.clearTimeout(previousTimer);
      if(trackLengthMillis > 0) {
        previousTimer = Meteor.setTimeout(function() {//fold into method up top
          var nextTrack = Tracklists.findOne({showId: track.showId, indexNumber: track.indexNumber + 1});
          if(nextTrack) {
            Meteor.call("startTrack", nextTrack._id);
          }
          else {
            console.log("there is no next track!")
            var showOptions = {isAutoPlaying: false};
            if(show.autoStartEnd) {
              showOptions.autoStartEnd = false;
              showOptions.isActive = false;
              App.fillAutoDJTrack();
            }
            Shows.update({isActive: true}, {$set: showOptions});
          }
        }, trackLengthMillis);
      }


    } else {
      Shows.update({_id: track.showId}, {$set: {isAutoPlaying: false}});    
    }

  },
  startNextTrack() {
    
  },
  autoplayNextTrack() {
    Shows.update({isActive: true}, {$set: {isAutoPlaying: true}})
    Meteor.call("startNextTrack");
  },
  pauseAutoplay() {
    Shows.update({isActive: true}, {$set: {isAutoPlaying: false}});
  },
  stopDefaultTracking(showId) {
    Shows.update({_id: showId}, {$set: {isShowingDefaultMeta: false}});
  },
  startDefaultTracking(showId) {
    Shows.update({_id: showId}, {$set: {isShowingDefaultMeta: true}});
  },
  toggleShowDescription(isShowing){
    Shows.update({isActive: true}, {$set: {isShowingDescription: isShowing}});
  },
  clearHighlighted() {
    Tracklists.update({isHighlighted:true}, {$set: {isHighlighted:false}}, {multi:true});
  }
})