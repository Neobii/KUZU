Template.myTracklists.helpers({
  currentActiveShow() {
    if (Meteor.user().isAdmin) {
      return Tracklists.findOne({ _id: FlowRouter.getParam('trackid') })
    } else {
      return Shows.findOne({ userId: Meteor.userId() }, { isActive: true })
    }
  },
})

AutoForm.hooks({
  insertTracklistForm: {
    onSuccess: () => {
      FlowRouter.go('alltracks')
    },
  },
})
