Shows = new Mongo.Collection("shows");

Shows.allow({
	insert: function(userId,doc){
		return !!userId;
	},
	update: (userId,doc)=> {
    return !!userId;
  }
});

Shows.helpers({
	user(){
		return Meteor.users.findOne({_id: this.userId});
	},
	showTracks(){
		return Tracklists.find({showId: this._id}, {sort: {playDate: -1}});
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
    }
})