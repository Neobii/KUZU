Template.registerHelper("prettifyTime", (date) => {
  if(!date) {
    return "";
  }
  var date = new moment(date).format("hh:mm:ss");
  return date;
})