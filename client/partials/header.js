Template.HomeLayout.onCreated(function() {
  this.autorun(() => {
    this.subscribe('new-messages-count-user')
  })
})

Template.HomeLayout.helpers({
  currentActiveShow() {
    return Shows.findOne({ isActive: true })
  },
})
