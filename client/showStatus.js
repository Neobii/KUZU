Template.showStatus.onCreated(function(){
	this.autorun(()=> {
		this.subscribe('activeShow');
		this.subscribe('TrackLists');
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
  }
})