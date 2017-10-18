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
  }
});

//SimpleRest.setMethodOptions('insertTrack', options);
SimpleRest.setMethodOptions('getCurrentTrack', {httpMethod: "get"});
SimpleRest.setMethodOptions('getCurrentAdditionalInfo', {httpMethod: "get"});

Meteor.methods({
  changePrivledge(userId, userRole, action){
    if(action == "add"){
      Roles.addUsersToRoles(userId, userRole, Roles.GLOBAL_GROUP)
    }
    else {
      //Roles.addUsersToRoles(userId)
    }
    //add/remove them to admin or as producer
  },
	updateProducerProfile: function (userId,name,image,bio) {
		Meteor.users.update({_id: userId}, {$set : {name: name, image: image, bio: bio, isProducer: true }});
	
	},
	editTrack(modifier, _id){
    console.log()
    console.log(_id + ' => '+ modifier); //see here?
		Tracklists.update({_id: _id}, modifier)
	},
  removeTrack(trackId){
    Tracklists.remove(trackId);
  },
  deactivateShow(showId) {
    Shows.update({_id: showId}, {$set: {isActive: false}});
  },
  activateShow(showId) {
    Shows.update({isActive: true}, {$set: {isActive: false}}, {multi: true});
    Shows.update({_id: showId}, {$set: {isActive: true}});
  },
  removeShow(showId){
    Shows.remove(showId);
  },
  getCurrentTrack(){
    var show = Shows.findOne({isActive: true});
    if(show && show.isShowingDefaultMeta){
      return show.defaultMeta;
    }
    var track = Tracklists.findOne({}, {sort: {playDate: -1}});
    var trackerString;
    if(track.artist && track.songTitle) {
        trackerString = track.artist + " - " + track.songTitle;
      }
      else if(track.songTitle) {
        trackerString = track.songTitle;
      }
      else if(track.artistName) {
        trackerString = track.artist;
      }
    return trackerString;
  },
  getCurrentAdditionalInfo(){
    var show = Shows.findOne({isActive: true});
    var ps = ProductionStatuses.findOne({isActive: true});
    if(ps && ps.isShowingAdditionalContent) {
      return ps.additionalContent;
    }
    if(show && show.isShowingDescription)
      return show.description;
    return "";
  },
  startTrack(trackId) {
    var track = Tracklists.findOne({_id: trackId});
    Shows.update({_id: track.showId}, {$set: {isShowingDefaultMeta: false}});
    Tracklists.update({_id: trackId}, {$set: {playDate: new Date()}})
  },
  stopDefaultTracking(showId) {
    Shows.update({_id: showId}, {$set: {isShowingDefaultMeta: false}})
  },
  startDefaultTracking(showId) {
    Shows.update({_id: showId}, {$set: {isShowingDefaultMeta: true}});
  },
  toggleShowDescription(isShowing){
    Shows.update({isActive: true}, {$set: {isShowingDescription: isShowing}});
  }
});

Meteor.method("insertTrack", function(artist, songTitle, album, label, duration) {
  if(!Shows.findOne({isActive: true})) {
    Tracklists.insert({artist: artist, songTitle, songTitle, album: album, label: label, duration: duration, playDate: new Date()})
  }
  }, {
    getArgsFromRequest: function (request) {
      // Let's say we want this function to accept a form-encoded request with
      // fields named `a` and `b`.
      var content = request.body;
      // Since form enconding doesn't distinguish numbers and strings, we need
      // to parse it manually
      //put to array JSON.parse(content);
      return [ content.artist, content.track, content.album, content.label, content.duration ];
    }
  }
)

Meteor.method('removeUser',function(userId){
    if(Meteor.user().profile.isAdmin){
        Meteor.users.remove(userId);
    }else if(this.userId === userId){
        Meteor.users.remove(userId);
    }
});
Meteor.method('isQueuedForNext',function(showId){
    Tracklists.update({showId: showId},$set: {isQueuedForNext: true});
});

// Enable cross origin requests for all endpoints
JsonRoutes.setResponseHeaders({
  "Cache-Control": "no-store",
  "Pragma": "no-cache",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
});
/*
Router.route( "/insertrack/:track", function() {
  	let artist  = this.params.name;
  	let track   = this.params.query;

  Tracklists.insert({songTitle: track.track, artist: track.artist, album: track.album, trackLength: track.tracklength});
}, { where: "server" });*/


Meteor.methods({
  parseUpload( data ) {
    check( data, Array );
    console.log(data);
    for ( let i = 1; i < data.length; i++ ) {
      let item   = data[ i ];
     console.log(item.Name);
     if(item){

      //insert here
     }

   }
  }
});

