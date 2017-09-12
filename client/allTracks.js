Template.allTracks.onCreated(function(){
	this.autorun(() => {
		this.subscribe("TrackLists")
	})

});
Template.allTracks.rendered=function() {
	$('#dateFrom').datepicker();
	$('#dateTo').datepicker();
}

Template.allTracks.helpers({
	Tracklists() {
		return Tracklists.find({});
	}
});

Template.allTracks.events({
	'click #exportcsv': function (event) {
		  var nameFile = 'fileDownloaded.csv';
		  Meteor.call('download', 1, function (error, fileContent) {
		  	if(fileContent){
		  		 var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
      			 saveAs(blob, nameFile);
		  	}
		  });
	}
});