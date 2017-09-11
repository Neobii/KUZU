Template.startShow.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('showList');
	})
});

Template.startShow.helpers({
	hasShow:()=> {
		return Meteor.user().hasShow(Meteor.userId());
	}
});