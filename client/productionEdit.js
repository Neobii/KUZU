Template.productionEdit.onCreated(function(){
	this.productionId = FlowRouter.getParam('productionId');
	this.autorun(()=>{
		this.subscribe('singleProduction',this.productionId);
	})
})

Template.productionEdit.helpers({
	production(){
		return ProductionStatuses.findOne({_id: FlowRouter.getParam('productionId')});
	}
})


AutoForm.hooks({
    productionUpdateForm: {
  		onSuccess() {
			FlowRouter.go('productionlist');          	
        }
    }
});