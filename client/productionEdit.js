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

Template.productionEdit.events({
	'click .cancel':function(e,t){
		if(confirm('Are You sure want to cancel?')){
				FlowRouter.go('productionlist');          	
		}
	}
})

AutoForm.hooks({
    productionUpdateForm: {
  		onSuccess() {
			FlowRouter.go('productionlist');          	
        }
    }
});