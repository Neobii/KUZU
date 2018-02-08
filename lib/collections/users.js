Meteor.users.helpers({
	hasShow() {//we don't need to use arrow notation for this
		return !!Shows.findOne({userId: this._id});
	},
  tracks() {
      return Tracklists.find({userId: this._id})//get all tracks that the user inserted the id from the user
  },
  shows(){
      return Shows.find({userId: this._id});
  }
});

Meteor.users.allow({
  update: (userId,doc)=> {
    return !!userId;
  }
});

//we need to put user schema here, look at simple schema docs on how to add schema to user
//this should be name, image (which will be autoform file), and bio (which should be summernote)


var userProfile = new SimpleSchema({
	name:{
		type: String,
		label: 'Name',
		optional: true
	}, 
});

var producerProfile = new SimpleSchema({
  name: {
    type: String,
    label: "Producer name"
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
  isPioneer: {
    type: Boolean,
    label: "Is this producer a pioneer",
    defaultValue: false
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
})

Meteor.users.attachSchema({
  isProducer:{
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
  isAdmin:{
    type: Boolean,
    optional: true
  },
  username: {
    type: String,
    optional: true
  },
  emails: {
    type: Array,
    optional: true
  },
  "emails.$": {
    type: Object
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  registered_emails: {
    type: Array,
    optional: true
  },
  'registered_emails.$': {
    type: Object,
    blackbox: true
  },
  createdAt: {
    type: Date
  },
  profile: {
    type: userProfile,
    optional: true
  },
  producerProfile: {
    type: producerProfile,
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: Array,
    optional: true
  },
  'roles.$': {
    type: String
  },
  heartbeat: {
    type: Date,
    optional: true
  },
    
});
