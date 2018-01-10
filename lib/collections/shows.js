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
      var user = Meteor.users.findOne({_id: options.search.userId})
      if(!user){
        return selector;
      }
      if(!user.isAdmin) {
        selector.userId = options.search.userId;
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
	}
})

Shows.attachSchema({
	showName:{
		type: String,
		label: "Show Name"
	},
	showStart: {
		type: Date,
		autoValue() {
			if(this.isInsert) {
				return new Date();
			}
		}
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
		autoform:{
			type: "hidden"
		}
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
  lastTrackStartedAt: {
    type: Date,
    label: "when the last track was played"
  }
});
