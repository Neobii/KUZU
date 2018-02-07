FlowRouter.route("/admin/shows", {
  name: "adminShows",
  action() {
    BlazeLayout.render("HomeLayout", {main: 'adminShows'});
  }
})

FlowRouter.route('/admin/production-statuses',{
  name: 'adminProductionStatuses',
  action(){
    BlazeLayout.render('HomeLayout',{main: 'adminProductionStatuses'});
  }
})

FlowRouter.route('/admin/users',{
  name: 'adminUsers',
  action(){
    BlazeLayout.render('HomeLayout',{main: 'adminUsers'});
  }
})

FlowRouter.route('/admin/tracks',{
  name: 'adminTracks',
  action(){
    BlazeLayout.render('HomeLayout',{ main: 'adminTracks'});
  }
})

FlowRouter.route('/admin/producers',{
  name: 'adminProducers',
  action(){
    BlazeLayout.render('HomeLayout',{ main: 'adminProducers' });
  }
})