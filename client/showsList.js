Template.showsList.onCreated(function(){
	this.autorun(() => {
		this.subscribe('showsList');
	})
})

Template.showsList.helpers({
	shows() {
    if(Meteor.user().isAdmin) {
      return Shows.find({}, {sort: {showStart: -1}});

    } else {
      return Shows.find({userId: Meteor.userId()}, {sort: {showStart: -1}});
    }
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
  },
 "click [data-delete-id]"(e, t) {
    if(confirm("Are You sure want to delete this?")){
      var showId = $(e.currentTarget).attr("data-delete-id");
      Meteor.call("removeShow", showId);
    }
  },
  "click [data-duplicate-id]" (e, t) {
    var showName = prompt("Duplicate Show Name?");
    console.log(showName);
    
  }
})