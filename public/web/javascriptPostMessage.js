$.post("/methods/insertMessage", { "messageBody": "HI WORLD", "sentBy": "yours truely"});

<div id="producer-message-form" style="text-align:center;display:none">
<input placeholder="Message" name="producerMessage"> <input placeholder="from" name="producerSentBy"><a href="" data-send-message> Send Message</a>
</div>
<script type="text/javascript">
  
setInterval(function(){
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function() {
    if(ajax.responseText == "true") {
      document.querySelector("#producer-message-form").style.display = "block";
    }
    else {
      document.querySelector("#producer-message-form").style.display = "none";
    }
  }
  ajax.open("GET", "https://producer.kuzu.fm/methods/hasMessagingEnabled", true);

  ajax.send();
}, 5000);
  document.querySelector("[data-send-message]").onclick = function(e){
    e.preventDefault(); 
    var sendMessage = new XMLHttpRequest();
    var message = document.querySelector("[name=producerMessage]").value;
    var sentBy = document.querySelector("[name=producerSentBy]").value;
    sendMessage.open("POST", "https://producer.kuzu.fm/methods/insertMessage");
    sendMessage.setRequestHeader("Content-type", "application/json; charset=utf-8");
    sendMessage.send(JSON.stringify({messageBody: message, sentBy: sentBy}));
    document.querySelector("[name=producerMessage]").value = "";
    document.querySelector("[name=producerSentBy]").value = "";
  }
</script>