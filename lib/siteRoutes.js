FlowRouter.route('/',{
  name: "home",
  action(){
    BlazeLayout.render('HomeLayout',{main: 'Home'});
  }
})