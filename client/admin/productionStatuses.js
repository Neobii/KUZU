Template.adminProductionStatuses.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('productionList');
	})
})

Template.adminProductionStatuses.helpers({
	prodlist(){
		if(Meteor.user().isAdmin) {
				return ProductionStatuses.find({});
		}else{
				return ProductionStatuses.find({userId: Meteor.userId()});
		}

	}
})