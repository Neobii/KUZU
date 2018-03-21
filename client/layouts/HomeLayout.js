Template.HomeLayout.onCreated(function(){
  this.isRadioLogikDown = new ReactiveVar(false);
  setInterval(() => {
    Meteor.call("getRadioLogikStatus", (err, res) => {
      this.isRadioLogikDown.set(res);
    })
  }, 5000)
})

Template.HomeLayout.helpers({
  armedShow() {
    return Shows.findOne({isArmedForAutoStart: true});
  },
	currentActiveShow() {
    if(Meteor.user().isAdmin) {
      return Shows.findOne({isActive:true});
    } else {
      return Shows.findOne({userId: Meteor.userId()}, {isActive: true});
    }
  },
  isRadioLogikDown() {
    return Template.instance().isRadioLogikDown.get();
  }
});
