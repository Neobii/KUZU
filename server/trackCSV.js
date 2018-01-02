Meteor.methods({
  downloadTracksCSV(dateFrom, dateTo) {
    tracks = Tracklists.find({ 'playDate' : { $gte : dateFrom, $lt: dateTo }}, {fields: {playDateOffset: 0, userId: 0, showId: 0, isQueuedForNext: 0}, sort: {playDate: 1}}).fetch();
      tracks.forEach(function(v){ 
        delete v._id 
      });
      tracks = _.map(tracks, function(track){
        track.albumName = track.albumName || "NA";
        track.songTitle = track.songTitle || "NA";
        track.artist = track.artist || "NA";
        track.label = track.label || "NA";
        track.trackLength = track.trackLength || "NA";
        return track;
      })
      var heading = true;
      var delimiter = "|";
   return exportcsv.exportToCSV(tracks, heading, delimiter);
  },
});