$.post("/methods/insertMessage", { "messageBody": "HI WORLD", "sentBy": "yours truely"});


<script type="text/javascript">
setInterval(function(){
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function() {
    if(ajax.responseText == "true") {
      document.querySelector("#producer-message-form").style.display = "block";
    }
    else if(ajax.responseText == "false") {
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
  document.querySelector("#messageSent").style.display = "block";
  setTimeout(function(){
    document.querySelector("#messageSent").style.display = "none";
  }, 2000);
}
</script>