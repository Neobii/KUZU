Posts = new Mongo.Collection("posts");

Posts.allow({
  insert:  (userId,doc)=> {
    return !!userId;
  },
  update: (userId,doc)=> {
    return !!userId;
  },
  remove: (userId, doc)=> {
    return !!userId;
  }
});

Posts.attachSchema({
  title: {
    type: String,
    label: "Post Title"
  },
  visibleBy: {
    type: [String],
    autoform: {
      afFieldInput: {
        type: "select-multiple",
        options: [
          {label: "Admin", value: "admin"},
          {label: "Pioneer Producers", value: "pioneer"},
          {label: "Evergreen Producers", value: "evergreen"},
          {label: "Public", value: "public"}
        ]
      }
    }
  },
  content: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'summernote',
  //    settings: // summernote options goes here
      }
    },
  },
  postDate: {
    type: Date,
    label: "Post Date",
    autoValue(){
      if(this.isInsert) {
        return new Date();
      }
    }
  }
})