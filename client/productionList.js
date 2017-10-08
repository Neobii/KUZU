Template.productionList.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('productionList');
	})
})

Template.productionList.helpers({
	prodlist(){
		return ProductionStatuses.find({});
	}
})