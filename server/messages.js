Meteor.method("insertMessage", function(messageBody, sentBy) {
  var activeShow = Shows.findOne({isActive: true}) || false;
  if(activeShow && messageBody){
    Messages.insert({content: messageBody, sentBy: sentBy, showId: activeShow._id, producerId: activeShow.userId});
  }
  }, {
    getArgsFromRequest: function (request) {
      // Let's say we want this function to accept a form-encoded request with
      // fields named `a` and `b`.
      var content = request.body;
      return [ content.messageBody, content.sentBy ];
    }
  }
)

SimpleRest.setMethodOptions('hasMessagingEnabled', {httpMethod: "get"});

Meteor.method("hasMessagingEnabled", function(){
  var activeShow = Shows.findOne({isActive: true});
  if(!activeShow) {
    return false;
  }
  if(activeShow.hasMessagingEnabled){
    return true;
  }
})

Meteor.publish('new-messages-count-user', function() {
  Counts.publish(this, 'messages-count-user', 
    Messages.find({isRead: false, producerId: this.userId})
  )
});

Meteor.publish('new-messages-count-show', function(showId) {
  Counts.publish(this, 'messages-count-show', 
    Messages.find({isRead: false, showId: showId})
  )
});

Meteor.methods({
  "markShowMessagesRead"() {
    var showId = Shows.findOne({isActive: true});
    Messages.update({showId: showId}, {$set: {isRead: true}}, {multi: true})
  },
  "markUserMessagesRead"() {
    Messages.update({producerId: this.userId}, {$set: {isRead: true}}, {multi: true})
  }
})

Meteor.methods({
  "removeMessage"(messageId){
    Messages.remove({_id: messageId});
  }
})