Meteor.methods({
	download: function(dateFrom=false,dateTo=false) {
  		var collection = '';
  		if(dateFrom){
  			collection = Tracklists.find({ 'playDate' : { $gte : dateFrom, $lt: dateTo }}).fetch();
  		}else{
  			collection = Tracklists.find().fetch();
  		}
  		var heading = true;
  		var delimiter = ";";
 	 return exportcsv.exportToCSV(collection, heading, delimiter);
	},
  downloadShowTracks: function(showId) {
    collection = Tracklists.find({showId: showId}, {fields: {userId: 0, showId: 0}}).fetch();
    collection.forEach(function(v){ delete v._id });
    var heading = true;
    var delimiter = "\t";
    return exportcsv.exportToCSV(collection, heading, delimiter);
  },
  duplicateShow(showId, showName) {
    var show = Shows.findOne({_id: showId});
    Shows.insert({
      showName: showName,
      defaultMeta: show.defaultMeta,
      isShowingDefaultMeta: show.isShowingDefaultMeta,
      description: show.description,
      isShowingDescription: show.isShowingDescription
    });
  },
  duplicateShowWithTracks(showId, showName) {
    var show = Shows.findOne({_id: showId});
    Shows.insert({
      showName: showName,
      defaultMeta: show.defaultMeta,
      isShowingDefaultMeta: show.isShowingDefaultMeta,
      description: show.description,
      isShowingDescription: show.isShowingDescription
    }, function(err, docInserted) {
      var trackLists = Tracklists.find({showId: show._id}).fetch();
      _.each(trackLists, function(trackList){
        Tracklists.insert({
          showId: docInserted,
          songTitle: trackList.songTitle,
          artist: trackList.artist,
          album: trackList.album,
          label: trackList.label,
          trackLength: trackList.trackLength,
          playDateOffset: trackList.playDateOffset//,
//					indexNumber: trackList.indexNumber
        })
      })
    });
  }
});

Meteor.methods({
  changePrivledge(userId, userRole, action){
    var obj =  {};
    obj[userRole] = !!action;
    Meteor.users.update({_id: userId}, {$set: obj});
  },
	updateProducerProfile: function (userId,name,image,bio) {
		Meteor.users.update({_id: userId}, {$set : {name: name, image: image, bio: bio, isProducer: true }});
	},
	editTrack(modifier, _id){
		Tracklists.update({_id: _id}, modifier)
	},
  removeTrack(trackId){
    Tracklists.remove(trackId);
  },
  deactivateShow(showId) {
    Shows.update({_id: showId}, {$set: {isActive: false}});
  },
  incrementPosition(trackId) {
		var track = Tracklists.findOne({_id: trackId});
		if(track.indexNumber || track.indexNumber === 0) {
			Tracklists.update({showId: track.showId, indexNumber: track.indexNumber + 1}, {$set: {indexNumber: track.indexNumber}});
			Tracklists.update({_id: trackId}, {$inc: {indexNumber: 1}});
		} else {
			var show = Shows.findOne({_id: track.showId});
      Tracklists.update({_id:trackId}, {$set: {indexNumber: show.getHighestTrackNumber()+1}})
		}
	},
  decrementPosition(trackId) {
    var track = Tracklists.findOne({_id: trackId});
		if(track.indexNumber) {
			//console.log(track.showId, track.indexNumber);
			Tracklists.update({showId: track.showId, indexNumber: track.indexNumber - 1}, {$set: {indexNumber: track.indexNumber}});
    	Tracklists.update({_id: trackId}, {$inc: {indexNumber: -1}});
		} else {
			Tracklists.update({_id:trackId}, {$set: {indexNumber:0}})
		}
  },
  activateShow(showId) {
    Shows.update({isActive: true}, {$set: {isActive: false}}, {multi: true});
    Shows.update({_id: showId}, {$set: {isActive: true}});
  },
  removeShow(showId){
    Shows.remove(showId);
  },
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
				var nextTrack = Tracklists.findOne({indexNumber: track.indexNumber + 1});
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
  // queueSong(trackId){
  //   Tracklists.update({isQueuedForNext: true}, {$set: {isQueuedForNext: false}}, {multi: true});
  //   Tracklists.update({_id: trackId}, {$set: {isQueuedForNext: true}});
  //},
});

Meteor.method('removeUser',function(userId){
    if(Meteor.user().isAdmin){
        Meteor.users.remove(userId);
    }else if(this.userId === userId){
        Meteor.users.remove(userId);
    }
});

// Meteor.method('isQueuedForNext',function(showId){
//     Tracklists.update({showId: showId}, {$set: {isQueuedForNext: true}});
// });
