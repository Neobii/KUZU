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
      isShowingDescription: show.isShowingDescription,
    }, function(err, docInserted) {
      var trackLists = Tracklists.find({showId: show._id}, {sort: {indexNumber: 1}}).fetch();
      _.each(trackLists, function(trackList){
        Tracklists.insert({
          showId: docInserted,
          songTitle: trackList.songTitle,
          artist: trackList.artist,
          album: trackList.album,
          label: trackList.label,
          trackLength: trackList.trackLength
        })
      })
    });
  }
});

Meteor.methods({
  getRadioLogikStatus(){
    return App.isRadioLogicDown;
  },
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
    App.fillAutoDJTrack();
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
    Shows.update({_id: showId}, {$set: {isActive: true, isShowingDefaultMeta: true, isArmedForAutoStart: false}});
  },
  removeShow(showId){
    Shows.remove(showId);
  },
  deleteFeature(featureId){
    FeatureRequests.remove({_id: featureId});
  },
  createNewShow(){
    var user = Meteor.users.findOne({_id: this.userId});
    var showName = "Kuzu Show";
    var showDescription = " ";
    var defaultMeta = "Kuzu Show";
    var hasMessagingEnabled = false;
    if(user.producerProfile) {
      showName = user.producerProfile.showName || "Kuzu Show";
      showDescription = user.producerProfile.description || "";
      defaultMeta = user.producerProfile.defaultMeta || "Kuzu Show";
      hasMessagingEnabled = user.producerProfile.isMessagingUIEnbled;
    }
    Shows.insert({
      userId: this.userId,
      showName: showName,
      description: showDescription,
      defaultMeta: defaultMeta,
      hasMessgingEnbled: hasMessagingEnabled
    });
  },
  clearPlaytime(trackId) {
    Tracklists.update({_id: trackId}, {$unset: {playDate: ""}})
  }
});

Meteor.method('removeUser',function(userId){
  if(Meteor.user().isAdmin){
    Meteor.users.remove(userId);
  } else if(this.userId === userId){
    Meteor.users.remove(userId);
  }
});