 Meteor.publish('TrackLists', ()=>{
    return Tracklists.find({}, {limit: 50});
  });

 Meteor.publish('singleTrack',(trackId)=>{
 	check(trackId, String);
 	return Tracklists.find({_id: trackId});
 });

  Meteor.publish('showTracks',(showId)=>{
    check(showId, String);
    return Tracklists.find({showId: showId});
 });


Meteor.publish('singleShow',(showId)=>{
    return Shows.find({_id: showId});
 });


 Meteor.publish('allProducers',()=> {
 	return Meteor.users.find({});
 });

 Meteor.publish('allShows',function () {
    return Shows.find({});
 });

 Meteor.publish('activeShow',function(){
    return Shows.find({isActive: true});
 })

 Meteor.publish('activeShowTracks', function(){
    var showId = Shows.findOne({isActive: true})._id;
    return Tracklists.find({showId: showId})
 })
 /*publishComposite('topTenPosts', {
    find() {
        // Find top ten highest scoring posts
        return Posts.find({}, { sort: { score: -1 }, limit: 10 });
    },
    children: [
        {
            find(post) {
                // Find post author. Even though we only want to return
                // one record here, we use "find" instead of "findOne"
                // since this function should return a cursor.
                return Meteor.users.find(
                    { _id: post.authorId },
                    { fields: { profile: 1 } });
            }
        },
        {
            find(post) {
                // Find top two comments on post
                return Comments.find(
                    { postId: post._id },
                    { sort: { score: -1 }, limit: 2 });
            },
            children: [
                {
                    find(comment, post) {
                        // Find user that authored comment.
                        return Meteor.users.find(
                            { _id: comment.authorId },
                            { fields: { profile: 1 } });
                    }
                }
            ]
        }
    ]
});*/