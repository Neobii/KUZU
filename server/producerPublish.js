Meteor.publish("producerShows", function() {  
  return Shows.find({$or: [{userId: this.userId}, {helperUserId: this.userId}]}, {fields: {description: 0}});
});