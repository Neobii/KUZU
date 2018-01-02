Template.editTrack.onCreated(function(){

	this.autorun(()=>{
		this.subscribe('singleTrack',FlowRouter.getParam("trackId"));
		this.subscribe('allShows');
	});
});

Template.editTrack.helpers({
	singleTrack() {
		if(Meteor.user().isAdmin){
			return Tracklists.findOne({_id: FlowRouter.getParam("trackId")});
		}else{
			return Tracklists.findOne({userId: Meteor.userId()},{_id: FlowRouter.getParam("trackId")});
		}
	}
});

AutoForm.hooks({
  editTrackForm: {
		onSuccess() {
		  window.history.back();
    }
  }
});