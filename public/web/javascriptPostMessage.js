$.post("/methods/insertMessage", { "messageBody": "HI WORLD", "sentBy": "yours truely"});

<script type="text/javascript">
setInterval(function(){
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4 && ajax.status == 200) {
      var data = JSON.parse(ajax.responseText);
      if(document.querySelector(".player .title")){
        document.querySelector(".player .title").innerHTML = data;
      }
    }
  }
  ajax.open("GET", "https://producer.kuzu.fm/methods/hasMessagingEnabled", true);

  ajax.send();
}, 1000);
</script>