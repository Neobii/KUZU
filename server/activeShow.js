Meteor.methods({
  startTrack(trackId) {
    var track = Tracklists.findOne({_id: trackId});
    Shows.update({_id: track.showId}, {$set: {isShowingDefaultMeta: false}});
    Tracklists.update({_id: trackId}, {$set: {playDate: new Date(), isHighlighted:true}});
    var show = Shows.findOne({_id: track.showId});
    if(track.trackLength && show.isAutoPlaying) {

      var trackLenArray = track.trackLength.match(/(\d*):(\d*)/);
      var trackLengthMilliseconds = (((trackLenArray[1]*60) + (trackLenArray[2]))*1000);

      if(trackLenArray[3]) {
        trackLengthMilliseconds +=  trackLenArray[3];
      }
      Meteor.setTimeout(function() {
        var nextTrack = Tracklists.findOne({showId: track.showId, indexNumber: track.indexNumber + 1});
        Meteor.call("startTrack", nextTrack._id);
      }, trackLengthMilliseconds);

    } else {
      Shows.update({_id: track.showId}, {$set: {isAutoPlaying: false}});    
    }

  },
  startNextTrack() {
    var show = Shows.findOne({isActive: true});
    var nextTrack = Tracklists.findOne({showId: show._id, playDate: {$exists: false}}, {sort: {indexNumber: 1}, limit: 1});
    if(nextTrack) {
      //console.log(nextTrack._id)
      Meteor.call("startTrack", nextTrack._id);
    }
    else {
      Shows.update({isActive: true}, {$set: {isAutoPlaying: false}});
    }
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
  /*toggleAutoPlay(showId, isAutoPlaying) {
    Shows.update({_id:showId}, {$set: {isAutoPlaying: isAutoPlaying}});
  },*/
  clearHighlighted() {
    Tracklists.update({isHighlighted:true}, {$set: {isHighlighted:false}}, {multi:true});
  }
})