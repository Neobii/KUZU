Template.showStatus.onCreated(function(){
	this.autorun(()=> {
		this.subscribe('activeShow');
		this.subscribe('activeShowTracks');
	})
});

Template.showStatus.helpers({
	currentActiveShow() {
    console.log(Meteor.user())
    if(Meteor.user().isAdmin) {
      console.log("I'm an admin")
        return Shows.findOne({isActive:true});
    }else{
        return Shows.findOne({userId: Meteor.userId()}, {isActive: true});
    }
  },
  highlightedTracks() {
  	return Tracklists.find({isHighlighted: true});
  },
  trackIsShowMeta(){
    var currentTrack = Tracklists.findOne({}, {sort: {playDate: -1}, limit: 1});
    return currentTrack && (currentTrack.trackType == "showMeta");
  }
});

Template.showStatus.events({
  "click [data-stop-show]"() {
    Meteor.call("deactivateShow", Shows.findOne({isActive: true})._id);
    FlowRouter.go("showsList")
  },
  'click [data-clear-highlighted]'(e, t) {
    Meteor.call("clearHighlighted");
  },
  'click [data-move-up]'(e, t) {
    var trackId = $(e.currentTarget).attr("data-move-up");
    Meteor.call("decrementPosition", trackId);
  },
  'click [data-move-down]'(e, t) {
    var trackId = $(e.currentTarget).attr("data-move-down");
    Meteor.call("incrementPosition", trackId);
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
    //window.scroll(0, 0);
    Meteor.call("startTrack", trackId);
  },
  "click [data-restart-track-id]"(e, t) {
    var trackId = $(e.currentTarget).attr("data-restart-track-id");
    //window.scroll(0, 0);
    result = window.confirm("Are you sure you want to restart the track?");
    if(result) {
      Meteor.call("startTrack", trackId)
    }
  },
  "click [data-show-description]"() {
    Meteor.call("toggleShowDescription", true)
  },
  "click [data-hide-description]"() {
    Meteor.call("toggleShowDescription", false)
  }
})


AutoForm.hooks({
  insertTracklistModal: {
    before: {
      insert(doc){
        var show = Shows.findOne({isActive: true});
        if(show) {
          doc.showId = show._id;  
        }
        return doc;
      }
    }
  }
});