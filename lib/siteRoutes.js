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
    BlazeLayout.render('HomeLayout',{ main: 'producers' });
  }
})

FlowRouter.route('/producer',{
  name: 'producer',
  action(){
    BlazeLayout.render('HomeLayout',{ main: 'producer' });
  }
})

FlowRouter.route('/edit-producer',{
  name: 'editproducer',
  action(){
    BlazeLayout.render('HomeLayout',{main: 'editProducer'});
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
