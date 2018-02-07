Template.productionList.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('productionList');
	})
})

Template.productionList.helpers({
	prodlist(){
		if(Meteor.user().isAdmin) {
				return ProductionStatuses.find({});
		}else{
				return ProductionStatuses.find({userId: Meteor.userId()});
		}

	}
})