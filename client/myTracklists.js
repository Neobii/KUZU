Template.myTracklists.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('activeShow');
	})
})

Template.myTracklists.helpers({
  currentActiveShow(){
    return Shows.findOne({isActive: true})
  }
})


AutoForm.hooks({
    insertTracklistForm: {
  		onSuccess: ()=> {
			FlowRouter.go('alltracks');          	
        }
    }
});