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

Meteor.methods({
	updateProducerProfile: function (userId,name,image,bio) {
		Meteor.users.update({_id: userId}, {$set : {name: name, image: image, bio: bio, isProducer: true }});
	
	},
	editTrack(_id, modifier){
console.log(_id + ' => '+ modifier); //see here?
		Tracklists.update({_id: _id}, modifier)
	}

});

Router.route( "/insertrack/:track", function() {
  	let artist  = this.params.name;
  	let track   = this.params.query;

  Tracklists.insert({songTitle: track.track, artist: track.artist, album: track.album, trackLength: track.tracklength});
}, { where: "server" });