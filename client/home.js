Template.Home.helpers({
  producersNote() {
    var ps = ProductionStatuses.findOne({isActive: true});
    return ps.producersNote;
  }
})