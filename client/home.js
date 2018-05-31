Template.Home.helpers({
  posts() {
    return Posts.find({}, {sort: {postDate: -1}})
  }
})

Template.Home.onCreated(function(){
  this.autorun(()=>{
    this.subscribe("posts")
  })
})