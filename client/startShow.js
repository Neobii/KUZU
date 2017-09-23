Template.startShow.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('showList');
	})
});

Template.startShow.helpers({
	shows: () => { 
		return Shows.find({userId: Meteor.userId()});
		}
	
});