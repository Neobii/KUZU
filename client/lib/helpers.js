Template.registerHelper('json', function(a) {
    try{
        return JSON.stringify(a);

    }catch(e){
    	return a;
    }

});

Template.registerHelper('isAdmin',function(){
	return 	Roles.userIsInRole(Meteor.userId(),['admin']);
})