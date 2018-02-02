FeatureRequests = new Mongo.Collection("featureRequests");

FeatureRequests.helpers({
  currentUserHasVotedUp(){
    return !!FeatureRequests.findOne({_id: this._id, userVotesUp: Meteor.userId()});
  },
  currentUserHasVotedDown(){
    return !!FeatureRequests.findOne({_id: this._id, userVotesDown: Meteor.userId()});
  }
})

FeatureRequests.allow({
  insert:  (userId,doc)=> {
    return !!userId;
  },
  update: (userId,doc)=> {
    return !!userId;
  }
});

FeatureRequests.attachSchema({
  name: {
    type: String,
    label: "Feature Name"
  },
  description: {
    type: String,
    label: "Description"
  },
  userVotesUp: {
    type: [String],
    label: "User Votes Up",
    optional: true
  },
  userVotesDown: {
    type: [String],
    label: "User Votes Down",
    optional: true
  },
  userId: {
    type: String,
    autoValue() {
      if(this.isInsert){
        return this.userId;
      }
    }
  },
  totalScore: {
    type: Number,
    defaultValue: 0
  }
})

FeatureRequests.before.update(function(userId, doc, fieldNames, modifier, options) {
  var total = doc.userVotesUp.length - doc.userVotesDown.length;
  if(modifier.$push && modifier.$push.userVotesUp){
    total += 2;
  }
  else {
    total -= 2;
  }
  if(!modifier.$set) {
    modifier.$set = {};
  }
  modifier.$set.totalScore = total;
  return doc;
})