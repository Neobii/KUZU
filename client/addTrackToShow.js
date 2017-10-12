Template.addTrackToShow.onCreated(function(){
  this.showId = FlowRouter.getParam('showId');
  this.autorun(()=>{
    this.subscribe("singleShow", this.showId);
  })
})

Template.addTrackToShow.helpers({
  show(){
  	if(Meteor.user().profile.isAdmin){
  		    return Shows.findOne({_id: FlowRouter.getParam('showId')});

  		}else{
    		return Shows.findOne({userId: Meteor.userId()},{_id: FlowRouter.getParam('showId')});
  		}
  }
})