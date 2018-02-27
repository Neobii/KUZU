Meteor.method("insertMessage", function(messageBody) {
  var activeShow = Shows.findOne({isActive: true}) || false;
  Messages.insert({artist: artist});
  }, {
    getArgsFromRequest: function (request) {
      // Let's say we want this function to accept a form-encoded request with
      // fields named `a` and `b`.
      var content = request.body;
      // Since form enconding doesn't distinguish numbers and strings, we need
      // to parse it manually
      //put to array JSON.parse(content);
      return [ content.messageBody ];
    }
  }
)

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