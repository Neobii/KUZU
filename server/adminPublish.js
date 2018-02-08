Meteor.publish("allUsersAdmin", function() {
  return Meteor.users.find({}, {fields: {"producerProfile.description": 0}});
})

Meteor.publish("allProducersAdmin", function() {
  return Producers.find();
})