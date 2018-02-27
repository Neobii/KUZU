Template.messages.onCreated(function(){
  this.autorun(()=>{
    this.subscribe("userMessages");
  })
})

Template.messages.helpers({
  messages(){
    return Messages.find({producerId: Meteor.userId()})
  }
})