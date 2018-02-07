FlowRouter.route("/admin/shows", {
  name: "adminShows",
  action() {
    BlazeLayout.render("HomeLayout", {main: 'adminShows'});
  }
})

FlowRouter.route('/admin/production-status',{
  name: 'adminProductionStatus',
  action(){
    BlazeLayout.render('HomeLayout',{main: "adminProductionStatus"});
  }
})

FlowRouter.route('/admin/production-list',{
  name: 'adminProductions',
  action(){
    BlazeLayout.render('HomeLayout',{main: 'adminproductions'});
  }
})

FlowRouter.route('/admin/users',{
  name: 'adminUsers',
  action(){
    BlazeLayout.render('HomeLayout',{main: 'adminUsers'});
  }
})
/*
FlowRouter.route('/admin/production-edit/:productionId',{
  name: 'productionedit',
  action(){
    BlazeLayout.render('HomeLayout',{main: 'productionEdit'});
  }
})*/

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