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
		//optional: true,
		defaultValue: "NOT SET",
	},
	playDate: {
		type: Date,
		autoValue() {
			if(this.isInsert){
				return new Date();
			}
		}
	},
	showId: {
		type: String,
		optional: true, 
		autoform: {
      		type: "hidden"
		}
		// sometimes tracks won't be inserted from a producer but thigns are played from an itunes account
		//put show on here
	},
	userId: {
		type: String,
		autoValue() {
			if(this.isInsert){
				return this.userId;
			}
		},
		optional: true,
		autoform: {
      		type: "hidden"
		}
	}
	//put rest of fields here

})
