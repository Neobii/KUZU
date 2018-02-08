FlowRouter.route('/producer/profile', {
  name: 'producerMyProfile',
  action() {
    document.title = "My Producer Profile";
    BlazeLayout.render('HomeLayout', {main: 'producerMyProfile' });
  }
})

FlowRouter.route('/producer/program-information', {
  name: 'producerMyProgram',
  action() {
    document.title = "My Producer Profile";
    BlazeLayout.render('HomeLayout', {main: 'producerMyProgram' });
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