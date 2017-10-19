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

FlowRouter.route('/edit-show/:showId',{
	name: 'editShow',
	action(){
		BlazeLayout.render('HomeLayout',{ main: 'editShow'});
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
		BlazeLayout.render('HomeLayout',{ main: 'createShow'});
	}
})

FlowRouter.route('/showtracks/:showId',{
	name: 'showtracks',
	action(){
		BlazeLayout.render('HomeLayout', {main: 'showTracks'});
	}
})

FlowRouter.route("/addTrackToShow/:showId", {
	name: "addTrackToShow",
	action() {
		BlazeLayout.render('HomeLayout', {main: "addTrackToShow"});
	}
})

FlowRouter.route('/production-status',{
	name: 'productionstatus',
	action(){
		BlazeLayout.render('HomeLayout',{main: "productionStatus"});
	}
})

FlowRouter.route('/production-list',{
	name: 'productionlist',
	action(){
		BlazeLayout.render('HomeLayout',{main: 'productionList'});
	}
})

FlowRouter.route('/production-edit/:productionId',{
	name: 'productionedit',
	action(){
		BlazeLayout.render('HomeLayout',{main: 'productionEdit'});
	}
})

FlowRouter.route('/users',{
	name: 'users',
	action(){
		BlazeLayout.render('HomeLayout',{main: 'users'});
	}
})