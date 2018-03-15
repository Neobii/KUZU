Template.editShow.onCreated(function(){
  this.autorun(()=>{
    this.subscribe('singleShow',this.data._id);
    this.subscribe("allUsersAdmin");
  })
})


/*Template.editShow.helpers({
  show() {
    if(Meteor.user() && Meteor.user().isAdmin){
      return Shows.findOne({_id: FlowRouter.getParam('showId')});
    } else {
      return Shows.findOne({userId: Meteor.userId(), _id: FlowRouter.getParam('showId')});
    }
  }
});*/

AutoForm.hooks({
  editShowInlineForm: {
    onSuccess() {
      Session.set("showEditingId", false);
    }
  }
});