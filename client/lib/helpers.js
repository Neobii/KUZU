Template.registerHelper('json', function(a) {
    try{
        return JSON.stringify(a);

    }catch(e){
    	return a;
    }

});

Template.registerHelper('isAdmin',function(){
	if(check == 0){
		return true;
	}else{
		return 	Meteor.user().profile.isAdmin;
	}
})