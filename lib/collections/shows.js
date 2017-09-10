Shows = new Mongo.Collection("shows");

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
			return this.userId;
		}
	},
})