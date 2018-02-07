FlowRouter.route("/admin/shows", {
  name: "adminShows",
  action() {
    document.title = "Admin Shows";
    BlazeLayout.render("HomeLayout", {main: 'adminShows'});
  }
})

FlowRouter.route('/admin/production-statuses',{
  name: 'adminProductionStatuses',
  action() {
    document.title = "Production Statuses";
    BlazeLayout.render('HomeLayout',{main: 'adminProductionStatuses'});
  }
})

FlowRouter.route('/admin/users',{
  name: 'adminUsers',
  action() {
    document.title = "Admin Users";
    BlazeLayout.render('HomeLayout',{main: 'adminUsers'});
  }
})

FlowRouter.route('/admin/tracks',{
  name: 'adminTracks',
  action() {
    document.title = "Admin Tracks";
    BlazeLayout.render('HomeLayout',{ main: 'adminTracks'});
  }
})

FlowRouter.route('/admin/producers',{
  name: 'adminProducers',
  action() {
    document.title = "Admin Producers";
    BlazeLayout.render('HomeLayout',{ main: 'adminProducers' });
  }
})