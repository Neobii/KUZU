Template.editShow.onCreated(function(){
	this.showId = FlowRouter.getParam('showid');
	this.autorun(()=>{
		this.subscribe('singleShow',this.showId);
	})
})


Template.editShow.helpers({
	show(){
		return Shows.findOne({_id: FlowRouter.getParam('showid')});
	}
});

AutoForm.hooks({
    editShowForm: {
  		onSuccess() {
			FlowRouter.go('showsList');          	
        }
    }
});