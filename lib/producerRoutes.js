FlowRouter.route('/producer/profile', {
  name: 'producerProfile',
  action() {
    document.title = "My Producer Profile";
    BlazeLayout.render('HomeLayout', {main: 'producerProfile' });
  }
})

FlowRouter.route('/producer/shows', {
  name: 'producerShows',
  action() {
    document.title = "My Shows";
    BlazeLayout.render('HomeLayout', {main: 'producerShows' });
  }
})

/*
FlowRouter.route('/edit-producer/:userId',{
  name: 'editproducer',
  action(){
    BlazeLayout.render('HomeLayout',{main: 'editProducer'});
  }
})
*/