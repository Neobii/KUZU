Template.startShow.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('showList');
	})
});

Template.startShow.helpers({
	shows: () => { 
		return Shows.findOne({userId: Meteor.userId()});
		}
	
});