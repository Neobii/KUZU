Template.allTracks.onCreated(function(){
	this.autorun(() => {
		this.subscribe("TrackLists")
	});
	Session.set('dateFrom', false);
});
Template.allTracks.rendered=function() {
	$('#dateFrom').datepicker();
	$('#dateTo').datepicker();
}

Template.allTracks.helpers({
	Tracklists() {
		if(Session.get('dateFrom')){
			return Tracklists.find({ 'playDate' : { $gte : Session.get('dateFrom'), $lt: Session.get('dateTo') }});
		}else{
			return Tracklists.find({});
		}
	}
});

Template.allTracks.events({
	'click #exportcsv': function (event) {
		  var nameFile = 'fileDownloaded.csv';
		  var dateFrom = Session.get('dateFrom');
		  var dateTo   = Session.get('dateTo');
		  Meteor.call('download',dateFrom,dateTo, function (error, fileContent) {
		  	if(fileContent){
		  		 var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
      			 saveAs(blob, nameFile);
		  	}
		  });
	},
	'change #datetimepicker7':()=>{
		var start = new Date($("#dateFrom").val());
		var end = new Date($("#dateTo").val());
			Session.set('dateFrom',start);
			Session.set('dateTo', end);
	}
});