FlowRouter.route('/',{
	name: "home",
	action(){
		BlazeLayout.render('HomeLayout',{main: 'Home'});
	}
})

FlowRouter.route('/streaming',{
	name: 'streaming',
	action(){
		BlazeLayout.render('HomeLayout',{ main: 'Streaming' });
	}
})

FlowRouter.route('/programs',{
	name: 'programs',
	action(){
		BlazeLayout.render('HomeLayout',{ main: 'Programs' });
	}
})

FlowRouter.route('/schedule',{
	name: 'schedule',
	action(){
		BlazeLayout.render('HomeLayout',{ main: 'Schedule' });
	}
})

FlowRouter.route('/producers',{
	name: 'producers',
	action(){
		BlazeLayout.render('HomeLayout',{ main: 'Producers' });
	}
})

FlowRouter.route('/member',{
	name: 'member',
	action(){
		BlazeLayout.render('HomeLayout',{ main: 'Member' });
	}
})

FlowRouter.route('/gifts',{
	name: 'gifts',
	action(){
		BlazeLayout.render('HomeLayout', { main: 'Gifts' });
	}
})

FlowRouter.route('/wish-list',{
	name: 'wish-list',
	action(){
		BlazeLayout.render('HomeLayout',{ main: 'Wishlist'});
	}
})

FlowRouter.route('/donatemusic',{
	name:'donatemusic',
	action(){
		BlazeLayout.render('HomeLayout',{ main: 'Donatemusic' });
	}
})

FlowRouter.route('/volunteer',{
	name: 'volunteer',
	action(){
		BlazeLayout.render('HomeLayout',{ main: 'Volunteer' });
	}
})

FlowRouter.route('/produce-a-show',{
	name: 'produce-a-show',
	action(){
		BlazeLayout.render('HomeLayout', { main: 'ProduceAshow' });
	}
})

FlowRouter.route('/underwrite',{
	name: 'underwrite',
	action(){
		BlazeLayout.render('HomeLayout',{ main: 'Underwrite' }); 
	}
})

FlowRouter.route('/mission',{
	name: 'mission',
	action(){
		BlazeLayout.render('HomeLayout',{ main: 'Mission'});
	}
})

FlowRouter.route('/lpfm',{
	name: 'lpfm',
	action(){
		BlazeLayout.render('HomeLayout',{ main: 'Lpfm' }); 
	}
})

FlowRouter.route('/supporters',{
	name:'supporters',
	action(){
		BlazeLayout.render('HomeLayout',{ main: 'Supporters' });
	}
})

FlowRouter.route('/board-members',{
	name: 'boardmembers',
	action(){
		BlazeLayout.render('HomeLayout',{ main: 'Boardmembers' });
	}
})

FlowRouter.route('/contact',{
	name: 'contact',
	action(){
		BlazeLayout.render('HomeLayout',{ main: 'Contact' });
	}
})

FlowRouter.route('/track-lists',{
	name: 'tracklists',
	action(){
		BlazeLayout.render('HomeLayout',{ main: 'myTracklists' });
	}
});

FlowRouter.route('/all-tracks',{
	name: 'alltracks',
	action(){
		BlazeLayout.render('HomeLayout',{ main: 'allTracks'});
	}
})

FlowRouter.route('/edit-track/:trackid',{
	name: 'edittrack',
	action(){
		BlazeLayout.render('HomeLayout',{ main: 'editTrack'});
	}
})

FlowRouter.route("/shows", {
	name: "showsList",
	action() {
		BlazeLayout.render("HomeLayout", {main: 'showsList'});
	}
})

FlowRouter.route("/showStatus", {
	name: "showStatus",
	action() {
		BlazeLayout.render("HomeLayout", {main: "showStatus"});
	}
})

FlowRouter.route('/start-show',{
	name: 'startshow',
	action(){
		BlazeLayout.render('HomeLayout',{ main: 'startShow'});
	}
})

FlowRouter.route('/showtracks/:showId',{
	name: 'showtracks',
	action(){
		BlazeLayout.render('HomeLayout', {main: 'showTracks'});
	}
})

Router.route( "/getTrackInfo", function() {
/*  var name    = this.params.name,
      query   = this.request.query,
      fields  = {};
  
  fields[ query.field ] = query.field;
   
  var getUser = Meteor.users.findOne( { "profile.username": name }, { fields: fields } ); 

  // Do something with our found user here (see below).*/

}, { where: "server" });

Router.route( "/setTrackInfo/artist/", function() {
/*  var name    = this.params.name,
      query   = this.request.query,
      fields  = {};
  
  fields[ query.field ] = query.field;
   
  var getUser = Meteor.users.findOne( { "profile.username": name }, { fields: fields } ); 

  // Do something with our found user here (see below).*/

}, { where: "server" });

Router.configure({
  notFoundTemplate: "notFound" 
});
Router.route('/', function () {

});