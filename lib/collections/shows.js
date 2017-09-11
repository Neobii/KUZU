Shows = new Mongo.Collection("shows");

Shows.allow({
	insert: function(userId,doc){
		return !!userId;
	}
});

Shows.attachSchema({
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
})