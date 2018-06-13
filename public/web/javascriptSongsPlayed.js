<script type="text/javascript">
getLastSongsPlayed();
setInterval(getLastSongsPlayed, 5000);

function getLastSongsPlayed(){
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4 && ajax.status == 200) {
      var data = JSON.parse(ajax.responseText);
      document.querySelector(".image-title.sqs-dynamic-text").innerHTML = data;
    }
  }
  ajax.open("GET", "https://producer.kuzu.fm/methods/getLastTracks", true);

  ajax.send();
}

</script>