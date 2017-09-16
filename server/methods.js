Meteor.methods({
	download: function() {
  		var collection = Tracklists.find().fetch();
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