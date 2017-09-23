Template.myTracklists.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('singleShow',Meteor.userId());
	})
})




AutoForm.hooks({
    insertTracklistForm: {
  		onSuccess: ()=> {
			FlowRouter.go('alltracks');          	
        }
    }
});