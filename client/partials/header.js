Template.HomeLayout.onCreated(function(){
  this.autorun(() => {
    this.subscribe("activeShow");
  })
});

Template.HomeLayout.helpers({
  currentActiveShow(){
    return Shows.findOne({isActive: true})
  }
})