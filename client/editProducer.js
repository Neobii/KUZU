Template.editProducer.helpers({
	profile(){
		return Meteor.users.findOne(Meteor.userId());
	}
})


AutoForm.hooks({
    profileUpdateForm: {
  		onSuccess() {
			FlowRouter.go('producer');          	
        }
    }
});