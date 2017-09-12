Template.editTrack.onCreated(function(){

	this.autorun(()=>{
		this.subscribe('singleTrack',FlowRouter.getParam("trackid"));
	});
});

Template.editTrack.helpers({
	singleTrack() {
		return Tracklists.findOne({_id: FlowRouter.getParam("trackid")});
	}
});

AutoForm.hooks({
    editTrackForm: {
  		onSuccess() {
			FlowRouter.go('alltracks');          	
        }
    }
});