Template.adminProducers.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('allProducers');
	})
})

Template.adminProducers.helpers({
	producers(){
		return Meteor.users.find({}).fetch();
	}
})

Template.adminProducers.events({
	"click [data-delete-userid]"(e,t){
		if(confirm("are you sure want to delete this?")){
	    var userId = $(e.currentTarget).attr("data-delete-userid");
			Meteor.call("removeUser", userId);
		}
	}
})







