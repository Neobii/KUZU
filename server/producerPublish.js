Meteor.publish("producerShows", function() {  
  //, {fields: {description: 0}}
  return Shows.find({$or: [{userId: this.userId}, {helperUserId: this.userId}]});
});

Meteor.publish("producerShows", function() {  
  //, {fields: {description: 0}}
  return Shows.find({$or: [{userId: this.userId}, {helperUserId: this.userId}]});
});