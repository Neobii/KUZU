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
			if(this.isInsert){
				return new Date();
			}
		},
		autoform:{
			type: "hidden"
		}
	},
	userId: {
		type: String,
		autoValue() {
			if(this.isInsert){
				return this.userId;
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
        var show = Shows.findOne({isActive: true});
        return show._id;
      }
    }
  }
});

