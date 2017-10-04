AutoForm.hooks({
    insertShowForm: {
  		onSuccess: function() {
			FlowRouter.go('showsList');          	
        },
    	 onSubmit: function(insertDoc, updateDoc, currentDoc) {
    	 	Shows.update({userId: Meteor.userId}, {$set :{isActive: false}});
  		}
    }
});

