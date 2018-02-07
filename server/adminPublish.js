Meteor.publish("allUsersAdmin", function() {
  return Meteor.users.find();
})

Meteor.publish("allProducersAdmin", function() {
  return Producers.find();
})