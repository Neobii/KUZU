Meteor.users.helpers({
		hasShow(userId){
			check(userId, String);
			return Shows.findOne({userId: userId});
		}
});
