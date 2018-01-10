Meteor.methods({
  reaperParseUpload(currentShowId, data ) {
    check( data, Array );
    for ( let i = 1; i < data.length; i++ ) {
      let item   = data[ i ];
      var regex = /%(.*)%/;
      if(item && item.Name){
        var match = item.albumName.match(regex)[1];
        if(!match) {
          var names = item.Name.split("|");
          if(!names[1]){
            continue;
          }
          var trackItem = {
            artist: names[0],
            songTitle: names[1],
            album: item.Album,
            label: item.Label,
            trackLength: item.Length,
            showId: currentShowId
          };
          Tracklists.insert(trackItem);
        } else {
          var trackItem = {
            artist: " ",
            songTitle: item.Name,
            trackLength: item.Length,
            showId: currentShowId,
            trackType: match
          };
        }
      }
    }
  }
});
