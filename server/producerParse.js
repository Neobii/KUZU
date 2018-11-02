Meteor.methods({
  reaperParseUpload(currentShowId, data) {
    check(data, Array)
    if (!currentShowId) {
      return
    }
    for (let i = 0; i < data.length; i++) {
      let item = data[i]
      var regex = /%(.*)%/
      if (item && item.Name) {
        var trackItem
        var match = item.Meta && item.Meta.match(regex)[1]
        if (!match) {
          var names = item.Name.split('|')
          if (!names[1]) {
            continue
          }
          trackItem = {
            artist: names[0],
            songTitle: names[1],
            album: item.Album,
            label: item.Label,
            trackLength: item.Length,
            showId: currentShowId,
          }
        } else {
          trackItem = {
            artist: ' ',
            songTitle: item.Name,
            album: ' ',
            label: ' ',
            trackLength: item.Length,
            showId: currentShowId,
            trackType: match,
          }
        }
        Tracklists.insert(trackItem)
      }
    }
  },
})
