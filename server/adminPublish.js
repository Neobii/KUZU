Meteor.publish("allUsersAdmin", function(){
  return Meteor.users.find();
})