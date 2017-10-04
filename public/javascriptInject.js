setInterval(function(){
  document.querySelector(".secondary-controls").innerHTML = "";
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4 && ajax.status == 200) {
      var data = JSON.parse(ajax.responseText);
      if(document.querySelector(".player .title")){
        document.querySelector(".player .title").innerHTML = data;
      }
    }
  }
  ajax.open("GET", "http://producer.kuzu.fm/methods/getCurrentTrack", true);

  ajax.send();
}, 1000)