Template.HomeLayout.helpers({

  	currentActiveShow() {
      console.log(Meteor.user())
      if(Meteor.user().isAdmin) {
        console.log("I'm an admin")
          return Shows.findOne({isActive:true});
      }else{
          return Shows.findOne({userId: Meteor.userId()}, {isActive: true});
      }
    // },
    // queuedNextSong() {
    //   return Tracklists.findOne({isQueuedForNext: true});
  }
});
