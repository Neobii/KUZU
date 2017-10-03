Template.showsList.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('allShows');
	})
})

Template.showsList.helpers({
	shows() {
		return Shows.find({});
	}
});