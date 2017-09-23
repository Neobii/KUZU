Shows = new Mongo.Collection("shows");

Shows.allow({
	insert: function(userId,doc){
		return !!userId;
	}
});

Shows.helpers({
	user(){
		return Meteor.users.find({_id: Meteor.userId()});
	},
	showTracks(){
		return Tracklists.find({showId: this._id});
	}
})

Shows.attachSchema({
	showName:{
		type: String
	},
	showStart: {
		type: Date,
		autoValue() {
			return new Date();
		}
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
		optional: true,
		defaultValue: true
	}
})