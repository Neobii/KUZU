Template.showStatus.onCreated(function(){
	this.autorun(()=> {
		this.subscribe('activeShow');
		this.subscribe('TrackLists');
	})
});

Template.showStatus.helpers({
	currentActiveShow() {
    return Shows.findOne({isActive: true})
  }
});