Template.registerHelper('json', function(a) {
    try{
        return JSON.stringify(a);

    }catch(e){
    	return a;
    }

});

Template.registerHelper('isAdmin',function(){
		return 	Meteor.user().profile.isAdmin;
})

Template.registerHelper('getEmail',function(emails){
	 return emails[0].address != 'undefined'  ? emails[0].address : '';
})
