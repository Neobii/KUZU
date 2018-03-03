Template.producerMessages.onCreated(function(){
  this.autorun(()=>{
    this.subscribe("userMessages");
  })
})

Template.producerMessages.helpers({
  messages(){
    return Messages.find({producerId: Meteor.userId()})
  }
})