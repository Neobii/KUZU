Meteor.methods({
	download: function() {
  		var collection = Tracklists.find().fetch();
  		var heading = true;
  		var delimiter = ";";
 	 return exportcsv.exportToCSV(collection, heading, delimiter);
	}
});