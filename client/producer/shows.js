Template.producerShows.helpers({
  hasFullUI() {
    return (this.helperUserId !== Meteor.userId() || Meteor.user().isAdmin || this.userId === Meteor.userId())
  },
  shows() {
    return Shows.find();
  }
});

Template.producerShows.onCreated(function(){
  this.autorun(function(){
    this.subscribe("producerShows");
  })
})