Template.registerHelper('json', function(a) {
    try{
        return JSON.stringify(a);

    }catch(e){
    	return a;
    }

});