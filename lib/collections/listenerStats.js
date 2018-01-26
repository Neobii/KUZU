ListenerStats = new Mongo.Collection("listenerStats");

ListenerStats.attachSchema({
  fetchDate: {
    type: Date,
    autoValue() {
      if(this.isInsert){
        return new Date();
      }
    },
    label: "fetch date"
  },
  numListeners: {
    type: Number,
    label: "Number of listeners"
  }
})