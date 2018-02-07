Template.adminTracks.onCreated(function(){
	Session.set('dateFrom', false);
	Session.set('showId', false);
});

Template.adminTracks.rendered = function() {
	$('#dateFrom').datepicker();
	$('#dateTo').datepicker();
}

Template.adminTracks.helpers({
	tracksIndex() {
		return TracklistsIndex;
	}
});

Template.adminTracks.events({
	'click #exportcsv': function (event) {
		  var dateFrom = Session.get('dateFrom');
		  var dateTo   = Session.get('dateTo');
		  var nameFile = 'tracks_' + dateFrom + "___" + dateTo + '_.csv';
		  Meteor.call('downloadTracksCSV',dateFrom, dateTo, function (error, fileContent) {
		  	if(fileContent){
		  		 var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
      			 saveAs(blob, nameFile);
		  	}
		  });
	},
	'change #datetimepicker6':()=>{
		var start = new Date($("#dateFrom").val());
		var end = new Date($("#dateTo").val());
			Session.set('showId', false);
			Session.set('dateFrom',start);
			Session.set('dateTo', end);
	},
	'change #datetimepicker7':()=>{
		var start = new Date($("#dateFrom").val());
		var end = new Date($("#dateTo").val());
			Session.set('showId', false);
			Session.set('dateFrom',start);
			Session.set('dateTo', end);
	},
	'click a[data-id]':(e,t)=>{
		var showId = $(event.target).data('id');
			Session.set('dateFrom',false);
			Session.set('showId', showId);
	},
	 "click [data-delete-trackid]":(e, t)=> {
	    if(confirm("Are You sure want to delete this?")){
	      var trackId = $(e.currentTarget).attr("data-delete-trackid");
	      Meteor.call("removeTrack", trackId);
	    }
	   }
});