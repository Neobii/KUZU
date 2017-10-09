Template.producers.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('allProducers');
	})
})

Template.producers.helpers({
	producers(){
		if(Roles.userIsInRole(Meteor.userId(),'admin')) {
				return Meteor.users.find({}).fetch();
          }else{
				return Meteor.users.find({_id: Meteor.userId()},{isProducer: true}).fetch();
          }
	}
})

Template.producers.events({
	"click [data-delete-userid]"(e,t){
		if(confirm("are you sure want to delete this?")){
			    var userId = $(e.currentTarget).attr("data-delete-userid");
   			    Meteor.call("removeUser", userId);
		}
	}
})







