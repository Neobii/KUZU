Template.registerHelper("prettifyTime", (date) => {
  var date = new moment(date).format("hh:mm:ss");
  return date;
})