Template.allTracks.onCreated(function(){
	this.autorun(() => {
		this.subscribe("TrackLists");
		this.subscribe("showList");
	});
	Session.set('dateFrom', false);
	Session.set('showId', false);

});
Template.allTracks.rendered=function() {
	$('#dateFrom').datepicker();
	$('#dateTo').datepicker();
}

Template.allTracks.helpers({
	Tracklists:()=> {
		if(Session.get('dateFrom')){
			return Tracklists.find({ 'playDate' : { $gte : Session.get('dateFrom'), $lt: Session.get('dateTo') }});
		}else if (Session.get('showId')) {
			return Tracklists.find({showId: Session.get('showId')});
		}else{
			return Tracklists.find({}, {sort: {playDate: -1}});
		}
	},
	shows:()=>{
		return Shows.find({userId: Meteor.userId()});
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
			Session.set('showId', false);
			Session.set('dateFrom',start);
			Session.set('dateTo', end);
	},
	'click a[data-id]':(e,t)=>{
		var showId = $(event.target).data('id');
			Session.set('dateFrom',false);
			Session.set('showId', showId);
	},
	 "click [data-delete-trackid]"(e, t) {
	    if(confirm("Are You sure want to delete this?")){
	      var trackId = $(e.currentTarget).attr("data-delete-trackid");
	      Meteor.call("removeTrack", trackId);
	    }
	   }
});