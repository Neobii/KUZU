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
}, 1000);

setInterval(function() {
  if(!document.querySelector("#additional-info-inject")){
    var elem = document.createElement("div");
    elem.id = "additional-info-inject";
    document.querySelector(".sqs-layout").appendChild(elem);
  }
  //
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4 && ajax.status == 200) {
      var res = ajax.responseText.substr(1, ajax.responseText.length-2).replace(/\\"/g, '"');
      document.querySelector("#additional-info-inject").innerHTML = res;
      //console.log(ajax.responseText)
      //var data = JSON.parse(ajax.responseText);
      /*if(document.querySelector(".player .title")){
        document.querySelector(".player .title").innerHTML = data;
      }*/
    }
  }
  ajax.open("GET", "http://producer.kuzu.fm/methods/getCurrentAdditionalInfo", true);

  ajax.send();
}, 2000);

