Tracklists = new Mongo.Collection("tracklists");

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
		autoform:{
			type: "hidden"
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
  playDateOffset: {
    type: Number,
    optional: true
  },
  isQueuedForNext: {
    type: Boolean,
    defaultValue: false
  }
});

