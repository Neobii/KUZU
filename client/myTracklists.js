AutoForm.hooks({
    insertTracklistForm: {
  		onSuccess: ()=> {
			FlowRouter.go('alltracks');          	
        }
    }
});