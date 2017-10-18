// Meteor.startup(function(){
//     var users = Meteor.users.find().fetch();
//     _.each(users,function(userData){
//         if(userData.emails[0].address === 'meteor@meteor.com'){
//         	console.log(userData._id);
//         	Meteor.users.update({_id: userData._id},{$set: {isAdmin: true}});
//         }
//     });
// });