Template.editProducer.onCreated(function() {
  this.userId = FlowRouter.getParam('userId')
  this.autorun(() => {
    this.subscribe('oneProducer', this.userId)
  })
})

Template.editProducer.helpers({
  profile() {
    if (Meteor.user().isAdmin) {
      return Meteor.users.findOne({ _id: FlowRouter.getParam('userId') })
    } else {
      return Meteor.users.findOne(Meteor.userId())
    }
  },
})

Template.editProducer.events({
  'click .cancel': function(e, t) {
    if (confirm('Are You sure want to cancel?')) {
      FlowRouter.go('producer')
    }
  },
})

AutoForm.hooks({
  profileUpdateForm: {
    onSuccess() {
      if (Meteor.user().isAdmin) {
        FlowRouter.go('producers')
      } else {
        FlowRouter.go('producer')
      }
    },
  },
})
