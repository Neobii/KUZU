Meteor.startup(function(){
    var users = Meteor.users.find().fetch();
    _.each(users,function(userData){
        if(userData.emails[0].address === 'meteor@meteor.com' ||
           userData.emails[0].address === 'iwilldevelopcodeforyou@gmail.com'){
        	Meteor.users.update({_id: userData._id},{$set: {profile: {isAdmin: true}}})
        }
    });
});