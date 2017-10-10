Producers = new Mongo.Collection("producers");

Producers.helpers({
  user(){
    return Meteor.users.findOne({_id: this.userId})
  }
})

Producers.attachSchema({
  name: {
    type: String,
    label: "Producer name"
  }
})