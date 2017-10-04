Template.showsList.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('allShows');
	})
})

Template.showsList.helpers({
	shows() {
		return Shows.find({}, {sort: {showStart: -1}});
	}
});

Template.showsList.events({
  "click [data-deactivate-show-id]"(e, t) {
    var showId = $(e.currentTarget).attr("data-deactivate-show-id");
    Meteor.call("deactivateShow", showId);
  },
  "click [data-activate-show-id]"(e, t) {
    var showId = $(e.currentTarget).attr("data-activate-show-id");
    Meteor.call("activateShow", showId);
    FlowRouter.go("showStatus")
  }
})