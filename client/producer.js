Template.producer.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('allShows');
	})
})


Template.producer.helpers({
	Shows(){
		return Shows.find({userId: Meteor.userId()});
	}
})