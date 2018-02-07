Template.adminProducers.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('allProducersAdmin');
		this.subscribe("allUsersAdmin")
	})
})

Template.adminProducers.helpers({
	producers() {
		return Producers.find();
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







