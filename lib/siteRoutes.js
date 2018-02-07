FlowRouter.route('/',{
  name: "home",
  action(){
    BlazeLayout.render('HomeLayout',{main: 'Home'});
  }
})

FlowRouter.route('/producer',{
  name: 'producer',
  action(){
    BlazeLayout.render('HomeLayout',{ main: 'producer' });
  }
})

FlowRouter.route('/edit-producer/:userId',{
  name: 'editproducer',
  action(){
    BlazeLayout.render('HomeLayout',{main: 'editProducer'});
  }
})
