Template.editProducer.helpers({
	profile(){
		return Meteor.users.findOne(Meteor.userId());
	}
})

Template.editProducer.events({
	'click .cancel':function(e,t){
		if(confirm("Are You sure want to cancel?")){
			FlowRouter.go('producer');
		}
	}
})

AutoForm.hooks({
    profileUpdateForm: {
  		onSuccess() {
			FlowRouter.go('producer');          	
        }
    }
});