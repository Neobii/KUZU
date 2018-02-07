FlowRouter.route('/producer/profile',{
  name: 'producerProfile',
  action(){
    BlazeLayout.render('HomeLayout',{ main: 'producerProfile' });
  }
})

FlowRouter.route('/producer/shows',{
  name: 'producerShows',
  action(){
    BlazeLayout.render('HomeLayout',{ main: 'producerProfile' });
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