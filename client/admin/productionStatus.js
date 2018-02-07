AutoForm.hooks({
    insertprodStatusForm: {
  		onSuccess() {
			FlowRouter.go('productionlist');          	
        }
    }
});