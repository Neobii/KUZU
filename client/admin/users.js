Template.adminUsers.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('allUsersAdmin')
	})
})

Template.adminUsers.helpers({
	users(){
		return Meteor.users.find({}).fetch();
	}
})

Template.adminUsers.events({
	'click [data-remove-userid]':function(e,t){
		if(confirm("Are sure want to delete this?")){
			var userId = $(e.currentTarget).attr("data-remove-userid");
			    Meteor.call("removeUser", userId);
		}
	}
})