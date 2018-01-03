SimpleRest.setMethodOptions('getCurrentTrack', {httpMethod: "get"});
SimpleRest.setMethodOptions('getCurrentAdditionalInfo', {httpMethod: "get"});
SimpleRest.setMethodOptions('getNicecastMeta', {httpMethod: "get"});

Meteor.methods({
  getCurrentTrack(){
    var show = Shows.findOne({isActive: true});
    if(show && show.isShowingDefaultMeta){
      return show.defaultMeta || " ";
    }
    var track = Tracklists.findOne({}, {sort: {playDate: -1}});
    var trackerString;
    if(track.artist && track.songTitle) {
      trackerString = track.artist + " - " + track.songTitle;
    }
    else if(track.songTitle) {
      trackerString = track.songTitle;
    }
    else if(track.artistName) {
      trackerString = track.artist;
    }
    return trackerString || " ";
  },
  getCurrentAdditionalInfo(){
    var show = Shows.findOne({isActive: true});
    var ps = ProductionStatuses.findOne({isActive: true});
    if(ps && ps.isShowingAdditionalContent) {
      return ps.additionalContent;
    }
    if(show && show.isShowingDescription)
      return show.description;
    return " ";
  },
  getNicecastMeta() {
    var artist = "Johnny";
    var track = "Petersz";
    var album = "";
    return `Title: ${track}|Artist: ${artist}|Album: ${album}|Time: 00:00`;
  },
  getCurrentAdditionalInfoHash(){

  }
});




Meteor.method("insertTrack", function(artist, songTitle, album, label, duration) {
  if(!Shows.findOne({isActive: true})) {
    Tracklists.insert({artist: artist, songTitle: songTitle, album: album, label: label, duration: duration, playDate: new Date()})
  }
  }, {
    getArgsFromRequest: function (request) {
      // Let's say we want this function to accept a form-encoded request with
      // fields named `a` and `b`.
      var content = request.body;
      // Since form enconding doesn't distinguish numbers and strings, we need
      // to parse it manually
      //put to array JSON.parse(content);
      return [ content.artist, content.songTitle, content.album, content.label, content.duration ];
    }
  }
)

JsonRoutes.setResponseHeaders({
  "Cache-Control": "no-store",
  "Pragma": "no-cache",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
});