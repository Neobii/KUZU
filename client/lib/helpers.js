Template.registerHelper('json', function(a) {
    try{
        return JSON.stringify(a);

    }catch(e){
    	return a;
    }

});

Template.registerHelper('getEmail',function(emails){
	 return emails[0].address != 'undefined'  ? emails[0].address : '';
})
Template.registerHelper("prettifyTime", (date) => {
  if(!date) {
    return "";
  }
  var date = new moment(date).format("hh:mm:ss");
  return date;
})

Template.registerHelper("prettifyDate", (date) => {
  if(!date) {
    return "";
  }
  var date = new moment(date).format("MMM DD");
  return date;
});
Template.registerHelper("prettifySimpleTime", (date) => {
  if(!date) {
    return "";
  }
  var date = new moment(date).format("h:mm a");
  return date;
})