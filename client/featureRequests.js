Template.featureRequests.onCreated(function(){
  this.autorun(() => {
    this.subscribe("featureRequests");
  })
})

Template.featureRequests.helpers({
  featureRequests(){
    return FeatureRequests.find({});
  }
})

Template.featureRequests.events({
  "click [data-vote-up]"(e, t) {
    var currentId = $(e.currentTarget).attr("data-vote-up");
    FeatureRequests.update({_id: currentId}, {$push: {userVotesUp: Meteor.userId()}, $pull: {userVotesDown: Meteor.userId()}})
  },
  "click [data-vote-down]"(e, t) {
    var currentId = $(e.currentTarget).attr("data-vote-down");
    FeatureRequests.update({_id: currentId}, {$push: {userVotesDown: Meteor.userId()}, $pull: {userVotesUp: Meteor.userId()}})
  },
})