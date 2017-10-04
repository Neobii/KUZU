Template.editProducer.helpers({
	profile(){
		return Meteor.users(Meteor.userId());
	}
})