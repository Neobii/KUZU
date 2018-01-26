Meteor.startup(function(){
  Meteor.setInterval(function(){
    var apiUrl = "http://138.197.2.189:8000/status-json.xsl";
    var response = HTTP.get(apiUrl).data;
    var numListeners = response.icestats.source.listeners;
    ListenerStats.insert({numListeners: numListeners});
  }, 300000);//every 5 minutes
});