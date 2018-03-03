Template.producerMyProgram.helpers({
  producerShowFields() {
    var showFields = 'producerProfile.showName,producerProfile.defaultMeta,producerProfile.description';
    if(Meteor.user().producerProfile.isMessagingUIEnbabled){
      showFields += ',producerProfile.messagingEnabledOnShows';
    }
    return showFields;
  }
})