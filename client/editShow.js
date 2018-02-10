Template.editShow.onCreated(function(){
	this.showId = FlowRouter.getParam('showId');
	this.autorun(()=>{
		this.subscribe('singleShow',this.showId);
		this.subscribe("adminAllUsers");
	})
})


Template.editShow.helpers({
	show() {
		if(Meteor.user() && Meteor.user().isAdmin){
			return Shows.findOne({_id: FlowRouter.getParam('showId')});
		} else {
			return Shows.findOne({userId: Meteor.userId(), _id: FlowRouter.getParam('showId')});
		}
	}
});

AutoForm.hooks({
  editShowForm: {
		onSuccess() {
		  window.history.back();
    }
  }
});