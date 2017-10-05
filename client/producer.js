Template.producer.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('allShows');
	})
})


Template.producer.helpers({
	producer(){
		return Meteor.users.find({_id: Meteor.userId()}).fetch();
	}
})