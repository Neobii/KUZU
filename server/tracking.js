SimpleRest.setMethodOptions('getCurrentTrack', { httpMethod: 'get' })
SimpleRest.setMethodOptions('getCurrentAdditionalInfo', { httpMethod: 'get' })
SimpleRest.setMethodOptions('getCurrentAdditionalInfoHash', {
  httpMethod: 'get',
})
SimpleRest.setMethodOptions('getNicecastMeta', { httpMethod: 'get' })

Meteor.methods({
  getCurrentTrack() {
    var show = Shows.findOne({ isActive: true })
    if (show && show.isShowingDefaultMeta) {
      return show.defaultMeta || ' '
    }
    var track = Tracklists.findOne({}, { sort: { playDate: -1 } })
    var trackerString
    if (track.artist && track.songTitle) {
      trackerString = track.artist + ' - ' + track.songTitle
    } else if (track.songTitle) {
      trackerString = track.songTitle
    } else if (track.artistName) {
      trackerString = track.artist
    }
    return trackerString || ' '
  },
  getCurrentAdditionalInfo() {
    var show = Shows.findOne({ isActive: true })
    var ps = ProductionStatuses.findOne({ isActive: true })
    if (ps && ps.isShowingAdditionalContent) {
      return ps.additionalContent
    }
    if (show && show.isShowingDescription) return show.description
    return ' '
  },
  getNicecastMeta() {
    var artist = ''
    var trackName = ''
    var album = ''
    var show = Shows.findOne({ isActive: true })
    if (show && show.isShowingDefaultMeta) {
      artist = show.defaultMeta || ' '
    } else {
      var track = Tracklists.findOne({}, { sort: { playDate: -1 } })
      artist = track.artist
      trackName = track.songTitle
      album = track.album
    }
    return `Title: ${trackName}|Artist: ${artist}|Album: ${album}|Time: 00:00`
  },
  getCurrentAdditionalInfoHash() {
    return currentHash
  },
})

var currentHash = ''

Meteor.method(
  'insertTrack',
  function(artist, songTitle, album, label, duration) {
    var activeShow = Shows.findOne({ isActive: true }) || false
    if (Shows.findOne({ isArmedForAutoStart: true })) {
      console.log(App.preshowTracksStarted)
      if (label.search(/<><>/g) !== -1) {
        label = label.replace(/<><>/g, '')
        if (!App.preshowTracksStarted) {
          App.preshowTracksStarted = true
        }
      } else if (App.preshowTracksStarted) {
        App.preshowTracksStarted = false
        Shows.update(
          { isActive: true },
          { $set: { isActive: false } },
          { multi: true }
        )
        Shows.update(
          { isArmedForAutoStart: true },
          { $set: { isActive: true, isArmedForAutoStart: false } }
        )
        Meteor.call('autoplayNextTrack')
      }
    } else {
      App.preshowTracksStarted = false
    }

    if (!activeShow || activeShow.hasRadioLogikTracking) {
      Tracklists.insert({
        artist: artist,
        songTitle: songTitle,
        album: album,
        label: label,
        trackLength: duration,
        playDate: new Date(),
      })
    } else {
      App.autoDJTrack = {
        artist: artist,
        songTitle: songTitle,
        album: album,
        label: label,
        trackLength: duration,
        playDate: new Date(),
      }
    }
  },
  {
    getArgsFromRequest: function(request) {
      // Let's say we want this function to accept a form-encoded request with
      // fields named `a` and `b`.
      var content = request.body
      // Since form enconding doesn't distinguish numbers and strings, we need
      // to parse it manually
      //put to array JSON.parse(content);
      return [
        content.artist,
        content.songTitle,
        content.album,
        content.label,
        content.duration,
      ]
    },
  }
)

Meteor.method(
  'getLastTracks',
  function(numTracks) {
    numTracks = numTracks || 30
    var tracks = Tracklists.find(
      { playDate: { $exists: 1 } },
      { sort: { playDate: -1 }, limit: numTracks }
    ).fetch()
    var tracksString = ''
    _.each(tracks, function(track) {
      var trackerString = ''
      if (track.isExportable()) {
        if (track.artist && track.songTitle) {
          trackerString = track.artist + ' - ' + track.songTitle
        } else if (track.songTitle) {
          trackerString = track.songTitle
        } else if (track.artistName) {
          trackerString = track.artist
        }
        trackerString += ' (' + track.prettifyPlaydate() + ')'
      }
      tracksString += trackerString + '</br>'
    })
    return tracksString
  },
  {
    getArgsFromRequest: function(request) {
      // Let's say we want this function to accept a form-encoded request with
      // fields named `a` and `b`.
      var content = request.body
      // Since form enconding doesn't distinguish numbers and strings, we need
      // to parse it manually
      //put to array JSON.parse(content);
      return [content.numTracks]
    },
    httpMethod: 'get',
  }
)

JsonRoutes.setResponseHeaders({
  'Cache-Control': 'no-store',
  Pragma: 'no-cache',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, X-Requested-With',
})

Meteor.startup(function() {
  Meteor.setInterval(function() {
    Meteor.call('getCurrentAdditionalInfo', function(err, res) {
      currentHash = CryptoJS.SHA1(res).toString()
    })
  }, 5000)
})
