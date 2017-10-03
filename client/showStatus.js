Template.showStatus.onCreated(function(){
	this.autorun(()=> {
		this.subscribe('activeShow');
	})
});

Template.showStatus.helpers({
	currentActiveShow() {
    return Shows.findOne({isActive: true})
  }
});