import { Index, MongoTextIndexEngine, MongoDBEngine } from 'meteor/easy:search'

Tracklists = new Mongo.Collection("tracklists");

TracklistsIndex = new Index({
  collection: Tracklists,
  fields: ['songTitle'],
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
	}
})

Tracklists.attachSchema({
  trackType: {
    type: String,
    label: "Track Type",
    defaultValue: "song",
    autoform: {
      options: [
          {name: "song", value: "song"},
          {name: "showMeta", value: "showMeta"},
          {name: "producerBio", value: "producerBio"},
          {name: "kuzuDefault", value: "kuzuDefault"}
      ]
    }
  },
	songTitle: {
		type: String,
		label: "Song Title"
	},
	playDate: {
		type: Date,
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
        //var show = Shows.findOne({isActive: true});
        if(!this.userId) {
          return "Auto DJ";
        }
        /*else {
          return show._id;
        }*/
      }
    }
  },
  isQueuedForNext: {
    type: Boolean,
    defaultValue: false
  },
  indexNumber: {
    type: Number,
    label: "Track Number",
    min:0,
//    defaultValue: 0,
    autoValue() {
      if(this.isInsert) {
        var showId = this.field("showId").value;
        var show = Shows.findOne({_id:showId});
        //console.log(show.getHighestTrackNumber());
        var highestTrack = show.getHighestTrackNumber() || 0;

        return (highestTrack + 1);
      }
    }
  }
});
