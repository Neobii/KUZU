FeatureRequests = new Mongo.Collection("featureRequests");

FeatureRequests.allow({
  insert:  (userId,doc)=> {
    return !!userId;
  },
  update: (userId,doc)=> {
    return !!userId;
  }
});

FeatureRequests.attachSchema({
  name: {
    type: String,
    label: "Feature Name"
  },
  description: {
    type: String,
    label: "Description"
  },
  userVotesUp: {
    type: [String],
    label: "User Votes Up",
    optional: true
  },
  userVotesDown: {
    type: [String],
    label: "User Votes Down",
    optional: true
  },
  userId: {
    type: String,
    autoValue() {
      if(this.isInsert){
        return this.userId;
      }
    }
  },
  totalScore: {
    type: Number,
    defaultValue: 0
  }
})