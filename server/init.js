Meteor.startup(function(){
    var users = Meteor.users.find().fetch();
    _.each(users,function(userData){
        if(userData.emails[0].address === 'meteor@meteor.com'){

            Roles.addUsersToRoles(userData,['admin']);
        }
    });
});