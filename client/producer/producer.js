Template.producerProfile.onCreated(function() {
  this.autorun(() => {
    this.subscribe('producerProfile')
  })
})

Template.producerProfile.helpers({
  producer() {
    return Producers.findOne({ userId: Meteor.userId() })
  },
})
