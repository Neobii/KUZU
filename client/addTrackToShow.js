Template.addTrackToShow.onCreated(function(){
  this.showId = FlowRouter.getParam('showId')
  this.autorun(()=>{
    this.subscribe("singleShow", this.showId);
  })
})

Template.addTrackToShow.helpers({
  mainShow(){
  	if(Meteor.user() && Meteor.user().isAdmin){
      console.log("Imma admin")
  		  return Shows.findOne({_id: FlowRouter.getParam('showId')});
  		}else{
    		return Shows.findOne({userId: Meteor.userId(), _id: FlowRouter.getParam('showId')});
  		}
  }
})


AutoForm.hooks({
    insertTracklistFormShow: {
      onSuccess: function() {
        //Meteor.call('isQueuedForNext', FlowRouter.getParam('showId'));
        FlowRouter.go('showTracks',{showId: FlowRouter.getParam('showId')});
      }
    }
});
