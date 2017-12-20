Template.editTrack.onCreated(function(){

	this.autorun(()=>{
		this.subscribe('singleTrack',FlowRouter.getParam("trackid"));
		this.subscribe('allShows');
	});
});

Template.editTrack.helpers({
	singleTrack() {
		if(Meteor.user().isAdmin){
			return Tracklists.findOne({_id: FlowRouter.getParam("trackid")});
		}else{
			return Tracklists.findOne({userId: Meteor.userId()},{_id: FlowRouter.getParam("trackid")});
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