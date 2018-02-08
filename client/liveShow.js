Template.liveShow.onCreated(function(){
	this.autorun(()=> {
		this.subscribe('activeShow');
		this.subscribe('activeShowTracks');
	})
});

Template.liveShow.helpers({
	currentActiveShow() {
    return Shows.findOne({isActive: true});
	},
	highlightedTracks() {
		return Tracklists.find({isHighlighted: true});
	},
  goBack() {
    window.history.back();
  }
});

Template.liveShow.events({
  "click [data-stop-show]"() {
    if(confirm("Are You sure want to stop this show?")){
      Meteor.call("deactivateShow", Shows.findOne({isActive: true})._id);
      window.history.back();
    }
  },
  'click [data-recent-tracks]'(e, t) {
    $("#recentlyPlayedSongs").modal();
    $("#recentlyPlayedSongs").on("hide.bs.modal", function(e){
      Meteor.call("clearHighlighted");
    })
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
  },
  "click [data-autoplay]"(){
    Meteor.call("autoplayNextTrack")
    //Meteor.call("startNextTrack");
  },
  "click [data-pause-autoplay]"(){
    Meteor.call("pauseAutoplay");
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