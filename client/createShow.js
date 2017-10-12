Template.createShow.onCreated( () => {
  Template.instance().uploading = new ReactiveVar( false );
});

Template.createShow.helpers({
  uploading() {
    return Template.instance().uploading.get();
  }
});

Template.createShow.events({
  'change [name="uploadCSV"]' ( event, template ) {
    template.uploading.set( true );

    Papa.parse( event.target.files[0], {
      header: true,
      complete( results, file ) {
        Meteor.call( 'parseUpload', results.data, ( error, response ) => {
          if ( error ) {
            console.log( error.reason );
          } else {
            template.uploading.set( false );
            alert( 'Upload complete!', 'success', 'growl-top-right' );
          }
        });
      }
    });
  }
});


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

