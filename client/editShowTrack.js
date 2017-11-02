Template.editShowTrack.onCreated(function(){

	this.autorun(()=>{
		this.subscribe('singleTrack',FlowRouter.getParam("trackId"));
		this.subscribe('allShows');
	});
});

Template.editShowTrack.helpers({
	singleTrack() {
		if(Meteor.user().isAdmin){
			return Tracklists.findOne({_id: FlowRouter.getParam("trackId")});
		}else{
			return Tracklists.findOne({userId: Meteor.userId()},{_id: FlowRouter.getParam("trackId")});
		}
	}
});

AutoForm.hooks({
    editShowTrackForm: {
  		onSuccess() {
			 FlowRouter.go('showTracks', {showId: FlowRouter.getParam("showId")});          	
        }
    }
});