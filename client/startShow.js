AutoForm.hooks({
    insertShowForm: {
  		onSuccess() {
			FlowRouter.go('showsList');          	
        }
    }
});