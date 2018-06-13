<script type="text/javascript">
setInterval(function(){
  //document.querySelector(".secondary-controls").innerHTML = "";
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4 && ajax.status == 200) {
      var data = JSON.parse(ajax.responseText);
      document.querySelector(".image-title.sqs-dynamic-text").innerHTML = data;
    }
  }
  ajax.open("GET", "https://producer.kuzu.fm/methods/getLastTracks", true);

  ajax.send();
}, 5000);

</script>