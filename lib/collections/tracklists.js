import { Index, MongoTextIndexEngine, MongoDBEngine } from 'meteor/easy:search'

Tracklists = new Mongo.Collection("tracklists");

TracklistsIndex = new Index({
  collection: Tracklists,
  fields: ['songTitle', 'artist', 'label', 'album'],
  engine: new MongoDBEngine({
    sort: function (searchObject, options) {
      return {playDate: -1};
    }
  }),
});

Tracklists.allow({
  insert:  (userId,doc)=> {
    return !!userId;
  },
  update: (userId,doc)=> {
    return !!userId;
  }
});

Tracklists.helpers({
	show(){
		return Shows.find({_id: this.showId});
	},
  isExportable() {
    if(this.playDate && (this.trackType === "song" || this.trackType === "talkingPoint")){
      return true
    }
  },
  prettifyPlaydate(){
    var date = new moment(this.playDate).format("h:mm a");
    return date;
  }
})

Tracklists.attachSchema({
  trackType: {
    type: String,
    label: "Track Type",
    defaultValue: "song",
    autoform: {
      firstOption: false,
      options: [
          {label: "song", value: "song"},
          {label: "talkingPoint (tracking changes, but track is not exported in csv)", value: "talkingPoint"},
          {label: "showMeta (shows the description of the show)", value: "showMeta"},
          {label: "producerBio (shows producer bio)", value: "producerBio"},
          {label: "kuzuDefault (pulled from production status)", value: "kuzuDefault"}
      ]
    }
  },
	songTitle: {
		type: String,
		label: "Song Title"
	},
	playDate: {
		type: Date,
    label: "Play Date: don't set this to a future date!"
		autoValue() {
			if(this.isInsert && !this.userId){
				return new Date();
			}
		},
    autoform: {
      type: "bootstrap-datetimepicker"
    },
    optional: true
	},
	userId: {
		type: String,
		autoValue() {
			if(this.isInsert){
        if(this.userId) {
          return this.userId;
        }
				else {
          return "Auto DJ";
        }
			}
		},
		autoform: {
      type: "hidden"
		}
	},
	artist: {
		type: String,
		label: 'Artist',
    optional: true
	},
	album:{
		type: String,
		label: 'Album',
    optional: true
	},
	label:{
		type: String,
		label: 'Label',
		optional: true
	},
	trackLength:{
		type: String,
		label: 'Track Length',
    optional: true
	},
	showId : {
    type : String,
    autoValue() {
      if(this.isInsert) {
        if(!this.userId) {
          return "Auto DJ";
        }
      }
    }
  },
  isHighlighted: {
    type: Boolean,
    defaultValue: false
  },
  indexNumber: {
    type: Number,
    label: "Track Number",
    min:0,
    autoValue() {
      if(this.isInsert) {
        var showId = this.field("showId").value;
        var show = Shows.findOne({_id:showId});
        if(show) {
          var highestTrack = show.getHighestTrackNumber();
          return (highestTrack + 1);
        }
      }
    },
    optional: true
  }
});
