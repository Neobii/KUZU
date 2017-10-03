Template.myTracklists.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('singleShow',Meteor.userId());
    this.subscribe('allShows');
	})
})




AutoForm.hooks({
    insertTracklistForm: {
  		onSuccess: ()=> {
			FlowRouter.go('alltracks');          	
        }
    }
});