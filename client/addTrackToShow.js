Template.addTrackToShow.onCreated(function(){
  this.showId = 
  this.autorun(()=>{
    this.subscribe("singleShow", this.showId);
  })
})

Template.addTrackToShow.helpers({
  show(){
  	if(Meteor.user().isAdmin){
  		    return Shows.findOne({_id: FlowRouter.getParam('showId')});
  		}else{
    		  return Shows.findOne({userId: Meteor.userId()},{_id: FlowRouter.getParam('showId')});
  		}
  }
})


AutoForm.hooks({
    insertTracklistFormShow: {
      onSuccess: function() {
        Meteor.call('isQueuedForNext', FlowRouter.getParam('showId'));
        FlowRouter.go('showtracks',{showId: FlowRouter.getParam('showId')});            
      }
    }
});
