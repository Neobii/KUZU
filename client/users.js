Template.users.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('allProducers')
	})
})

Template.users.helpers({
	users(){
		if(Meteor.user().profile.isAdmin){
			return Meteor.users.find({}).fetch();
		}
	}
})

Template.users.events({
	'click [data-remove-userid]':function(e,t){
		if(confirm("Are sure want to delete this?")){
			var userId = $(e.currentTarget).attr("data-remove-userid");
			    Meteor.call("removeUser", userId);

		}
	}
})