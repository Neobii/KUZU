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
	}
});

//SimpleRest.setMethodOptions('insertTrack', options);
SimpleRest.setMethodOptions('getCurrentTrack', {httpMethod: "get"});

Meteor.methods({
	updateProducerProfile: function (userId,name,image,bio) {
		Meteor.users.update({_id: userId}, {$set : {name: name, image: image, bio: bio, isProducer: true }});
	
	},
	editTrack(modifier, _id){
    console.log()
    console.log(_id + ' => '+ modifier); //see here?
		Tracklists.update({_id: _id}, modifier)
	},
  
  getCurrentTrack(){
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
  }
});

Meteor.method("insertTrack", function(artist, songTitle, album, label, duration) {
    Tracklists.insert({artist: artist, songTitle, songTitle, album: album, label: label, duration: duration, playDate: new Date()})
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