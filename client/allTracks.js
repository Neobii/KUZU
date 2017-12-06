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
			return Tracklists.find({userId: Meteor.userId()},{ 'playDate' : { $gte : Session.get('dateFrom'), $lt: Session.get('dateTo') }});
		}else if (Session.get('showId')) {
			return Tracklists.find({userId: Meteor.userId()},{showId: Session.get('showId')});
		}else if(Meteor.user().isAdmin){
			return Tracklists.find({}, {sort: {playDate: -1}});
		}else{
			return Tracklists.find({userId: Meteor.userId()}, {sort: {playDate: -1}});
		}
	},
	shows:()=>{
		  	if(Meteor.user().isAdmin){
				return Shows.find({});
		  	}else{
				return Shows.find({userId: Meteor.userId()});
		  	}
	}
});

Template.allTracks.events({
	'click #exportcsv': function (event) {
		  var dateFrom = Session.get('dateFrom');
		  var dateTo   = Session.get('dateTo');
		  var nameFile = 'tracks_' + dateFrom + "___" + dateTo + '_.tsv';
		  Meteor.call('downloadTracksTSV',dateFrom, dateTo, function (error, fileContent) {
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