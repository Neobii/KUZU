Template.adminAutoDJPlaylists.onCreated(function(){
  this.autorun(()=>{
    this.subscribe("allAutoDJPlaylists");
  })
})

Template.adminAutoDJPlaylists.helpers({
  autoDJPlaylists(){
    return AutoDJPlaylists.find();
  }
})