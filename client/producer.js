Template.producer.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('allShows');
	})
})


Template.producer.helpers({
	producer(){
		if(Meteor.user().profile.isAdmin){
			return Meteor.users.find({}).fetch();
		}else{
			return Meteor.users.find({_id: Meteor.userId()}).fetch();
		}
	}
})