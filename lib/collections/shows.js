import { Index, MongoTextIndexEngine, MongoDBEngine } from 'meteor/easy:search'
Shows = new Mongo.Collection("shows");

Shows.allow({
	insert: function(userId,doc){
		return !!userId;
	},
	update: (userId,doc)=> {
    return !!userId;
  }
});

ShowsIndex = new Index({
  collection: Shows,
  fields: ['showName'],
  engine: new MongoDBEngine({
    selector(searchDefinition, options, aggregation) {
      const selector = this.defaultConfiguration().selector(searchDefinition, options, aggregation)
      var user = Meteor.users.findOne({_id: options.search.userId});
      if(!user){
        selector.userId = false;
        return selector;
      }
      if(!user.isAdmin) {
        selector["$or"] = [{userId: options.search.userId}, {helperUserId: options.search.userId}];
      }
      return selector;
    },
    sort: function (searchObject, options) {
      return {showStart: -1};
    },
    fields(searchObject, options) {
      return {description: 0};
    }
  })
});

Shows.helpers({
	user(){
		return Meteor.users.findOne({_id: this.userId});
	},
	showTracks(){
		return Tracklists.find({showId: this._id}, {sort: {indexNumber: 1}});
	},
	getHighestTrackNumber(){
		var track = Tracklists.findOne({showId: this._id}, {sort: {indexNumber: -1}});
		if(track) {
			return track.indexNumber;
		} else {
			return -1;
		}
	},
  hasNextTrack() {
    var show = Shows.findOne({isActive: true});
    var nextTrack = Tracklists.findOne({showId: show._id, playDate: {$exists: false}}, {sort: {indexNumber: 1}, limit: 1});
    return !!nextTrack;
  },
  currentUserOwnsShow() {
    return this.userId == Meteor.userId();
  }
})

Shows.attachSchema({
	showName:{
		type: String,
		label: "Show Name"
	},
	showStart: {
		type: Date,
		autoform: {
      type: "bootstrap-datetimepicker"
    },
	},
  showEnd: {
    type: Date,
    autoform: {
      type: "bootstrap-datetimepicker"
    },
  },
  autoStartEnd: {
    type: Boolean,
    label: "Autostart and end show?",
    defaultValue: false
  },
	defaultMeta: {
		type: String,
		label: "Default Show Meta Data (When you don't want song title and artist name on media player)"
	},
	isShowingDefaultMeta: {
		type: Boolean,
		label: "Show this default data on media player",
		defaultValue: false
	},
	userId: {
		type: String,
		autoValue() {
			if(this.isInsert){
				return this.userId;
			}
		},
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
    },
	},
	isActive:{
		type: Boolean,
		optional: true
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
   isShowingDescription: {
   	type: Boolean,
   	label: "is the description showing",
   	defaultValue: true
  },
  isAutoPlaying: {
    type: Boolean,
    label: "Does this show autoplay?",
    defaultValue: false
  },
  helperUserId: {
    type: String,
    label: "Helper User",
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
    },
    optional: true
  }
});

Shows.after.update(function (userId, doc, fieldNames, modifier, options) {
  if(Meteor.isServer && doc.autoStartEnd && modifier.$set && (modifier.$set.showStart || modifier.$set.showEnd)){
    SyncedCron.remove("AutoStart_" + doc._id);
    SyncedCron.remove("AutoEnd_" + doc._id);
    App.addAutoStartShow(doc._id);
  }
})