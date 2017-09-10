Template.allTracks.onCreated(function(){
	this.autorun(() => {
		this.subscribe("TrackLists")
	})

});
Template.allTracks.rendered=function() {
	//$('#dateFrom').datepicker();
	//$('#dateTo').datepicker();
}

Template.allTracks.helpers({
	Tracklists() {
		return Tracklists.find({});
	}
});
