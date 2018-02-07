/*Producers = new Mongo.Collection("producers");

Producers.allow({
  insert: function(userId,doc){
    return !!userId;
  },
  update: (userId,doc)=> {
    return !!userId;
  }
});

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
    label: "Defaul Show Name",
  },
  defaultMeta: {
    type: String,
    label: "Default Show Meta Data (When you don't want song title and artist name on media player)",
    optional: true
  },
  description: {
    type: String,
    label: "Default Show Description",
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
    label: "Producer Bio",
    autoform: {
      afFieldInput: {
        type: 'summernote',
  //    settings: // summernote options goes here
      }
    },
    optional: true
  },
  userId: {
    type: String,
    label: "User",
    autoform: {
      afFieldInput: {
        options() {
          var users = Meteor.users.find().fetch();
          var usersArray = [];
          _.each(users, function(user){
            usersArray.push({label: user.emails[0].address, value: user._id});
          });
          return usersArray;
        }
      }
    }
  }
})*/