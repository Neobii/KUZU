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
  },
  showName:{
    type: String,
    label: "Show Name"
  },
  defaultMeta: {
    type: String,
    label: "Default Show Meta Data (When you don't want song title and artist name on media player)"
  },
  description: {
    type: String,
    label: "Description",
    autoform: {
      afFieldInput: {
        type: 'summernote',
  //    settings: // summernote options goes here
      }
    },
    optional: true
  },
  bio: {
    type: String,
    label: "Description",
    autoform: {
      afFieldInput: {
        type: 'summernote',
  //    settings: // summernote options goes here
      }
    },
    optional: true
  }
})