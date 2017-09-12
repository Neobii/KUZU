Template.Producers.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('allProducers');
	});
});

Template.Producers.helpers({
	producers() {
			Meteor.call('updateProducerProfile', Meteor.userId(),'David Shea','logo.png','this is bio');

		return Meteor.users({});
	}
});