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
		optional: true,
		autoform: {
      		type: "hidden"
		}
	},
	//put rest of fields here
	timeStamp:{
		type: String,
		optional: true,
		autoValue() {
			if(this.isInsert){
				return  new Date.now();
			}
		},
		autoform:{
			type: 'hidden'
		}

	},
	artist:{
		type: String,
		label: 'Artist'
	},
	album:{
		type: String,
		label: 'Album'
	},
	label:{
		type: String,
		label: 'Label',
		optional: true
	},
	trackLength:{
		type: String,
		label: 'Track Length'
	},
	showId : {
    type : String,
    label : "Select Show",
    optional: true,
    autoform : {
      options: function(){
      	 return Shows.find().map(function (show) {
      			return {label: show.showName, value: show._id};
  		 });
      }
    }
  }
});

