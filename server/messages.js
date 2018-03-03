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
      console.log(content);
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
  Counts.publish(this, 'new-messages-count-user', 
    Messages.find({isRead: false, producerId: this.userId})
  )
});

Meteor.publish('new-messages-count-show', function() {
  var show = Shows.findOne({isActive: true});
  Counts.publish(this, 'new-messages-count-show', 
    Messages.find({isRead: false, showId: show._id})
  )
});

Meteor.methods({
  "markShowMessagesRead"() {
    var show = Shows.findOne({isActive: true});
    if(show) {
      Messages.update({showId: show._id}, {$set: {isRead: true}}, {multi: true})
    }
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