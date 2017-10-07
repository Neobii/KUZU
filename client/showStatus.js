Template.showStatus.onCreated(function(){
	this.autorun(()=> {
		this.subscribe('activeShow');
		this.subscribe('activeShowTracks');
	})
});

Template.showStatus.helpers({
	currentActiveShow() {
    return Shows.findOne({isActive: true})
  }
});

Template.showStatus.events({
  "click [data-stop-show]"() {
    Meteor.call("deactivateShow", Shows.findOne({isActive: true})._id);
    FlowRouter.go("showsList")
  },
  "click [data-stop-default-tracking]"() {
    var showId = Shows.findOne({isActive: true})._id;
    Meteor.call("stopDefaultTracking", showId);
  },
  "click [data-start-default-tracking]"() {
    var showId = Shows.findOne({isActive: true})._id;
    Meteor.call("startDefaultTracking", showId);
  },
  "click [data-start-track-id]"(e, t) {
    var trackId = $(e.currentTarget).attr("data-start-track-id");
    Meteor.call("startTrack", trackId);
  },
  "click [data-restart-track-id]"(e, t) {
    var trackId = $(e.currentTarget).attr("data-restart-track-id");
    result = window.confirm("Are you sure you want to restart the track?");
    if(result) {
      Meteor.call("startTrack", trackId)
    }
  }
})