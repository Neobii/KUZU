Template.createShow.onCreated(function(){
  this.autorun(()=>{
    this.subscribe("allUsers");
  })
})

AutoForm.hooks({
  insertShowForm: {
		onSuccess: function() {
		  FlowRouter.go('showStatus');          	
    },
	  onSubmit: function(insertDoc, updateDoc, currentDoc) {
	 	  Shows.update({userId: Meteor.userId}, {$set :{isActive: false}});
		}
  }
});

