Template.showTracks.onCreated(function(){
		this.autorun(()=>{
			this.subscribe('singleShow',FlowRouter.getParam('showId'));
			this.subscribe('showTracks',FlowRouter.getParam('showId'));
		})
})

Template.showTracks.helpers({
	showMain() {
    if(Meteor.user() && Meteor.user().isAdmin) {
        return Shows.findOne({_id: FlowRouter.getParam('showId')});
    } else{
        return Shows.findOne({userId: Meteor.userId(), _id: FlowRouter.getParam('showId')});
    }
	}
})

Template.showTracks.events({
  'click [data-download-csv]': function (event) {
    var show = Shows.findOne({_id: FlowRouter.getParam('showId')});
    var nameFile = show.showName + '_tracks.tsv';
    Meteor.call('downloadShowTracks', FlowRouter.getParam('showId'), function (error, fileContent) {
      if(fileContent){
         var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
           saveAs(blob, nameFile);
      }
    });
  },
  'click [data-remove-track]'(e, t) {
    var trackId = $(e.currentTarget).attr("data-remove-track");
    Meteor.call("removeTrack", trackId);
  }
})