FlowRouter.route('/track-lists',{
	name: 'tracklists',
	action(){
		BlazeLayout.render('HomeLayout',{ main: 'myTracklists' });
	}
});

FlowRouter.route('/edit-track/:trackId',{
	name: 'edittrack',
	action(){
		BlazeLayout.render('HomeLayout',{ main: 'editTrack'});
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

FlowRouter.route('/show/:showId/tracks',{
	name: 'showTracks',
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

FlowRouter.route("/track-imports", {
	name: "trackImports",
	action(){
		BlazeLayout.render("HomeLayout", {main: "trackImports"})
	}
})

FlowRouter.route("/kuzu-stats", {
	name: "kuzuStats",
	action(){
		BlazeLayout.render("HomeLayout", {main: "kuzuStats"});
	}
})

FlowRouter.route("/feature-requests", {
	name: "featureRequests",
	action() {
		BlazeLayout.render("HomeLayout", {main: "featureRequests"})
	}
})