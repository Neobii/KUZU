App = {};
App.fillAutoDJTrack = function(){
  if(App.autoDJTrack && !Shows.findOne({isActive: true, hasRadioLogikTracking: true})) {
    Tracklists.insert({
      artist: App.autoDJTrack.artist,
      songTitle: App.autoDJTrack.songTitle,
      album: App.autoDJTrack.album,
      label: App.autoDJTrack.label,
      trackLength: App.autoDJTrack.duration,
      playDate: App.autoDJTrack.playDate
    })
    delete App.autoDJTrack;
  }
};
App.preshowTracksStarted = false;