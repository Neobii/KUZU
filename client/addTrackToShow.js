Template.addTrackToShow.onCreated(function(){
  this.showId = FlowRouter.getParam('showId');
  this.autorun(()=>{
    this.subscribe("singleShow", this.showId);
  })
})

Template.addTrackToShow.helpers({
  show(){

    return Shows.findOne({_id: FlowRouter.getParam('showId')});
  }
})