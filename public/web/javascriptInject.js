<script type="text/javascript">
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
  ajax.open("GET", "https://producer.kuzu.fm/methods/getCurrentTrack", true);

  ajax.send();
}, 1000);

var oldRes = "";

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
      if(oldRes != ajax.responseText) {
        oldRes = ajax.responseText;
        var reqAjax = new XMLHttpRequest();
        reqAjax.onreadystatechange = function() {
          if (reqAjax.readyState == 4 && reqAjax.status == 200) {
            var res = reqAjax.responseText.substr(1, reqAjax.responseText.length-2).replace(/\\"/g, '"');
            document.querySelector("#additional-info-inject").innerHTML = res;  
          }
        }
        reqAjax.open("GET", "https://producer.kuzu.fm/methods/getCurrentAdditionalInfo", true);

        reqAjax.send();
      }
    }
  }
  ajax.open("GET", "https://producer.kuzu.fm/methods/getCurrentAdditionalInfoHash", true);

  ajax.send();
}, 2000);
</script>