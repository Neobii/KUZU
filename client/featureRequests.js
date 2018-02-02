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