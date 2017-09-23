Template.showTracks.onCreated(function(){
		this.autorun(()=>{
			this.subscribe('singleShow',FlowRouter.getParam('showId'));
			this.subscribe('showTracks',FlowRouter.getParam('showId'));
		})
})

Template.showTracks.helpers({
	show:()=>{
		return Shows.findOne({_id: FlowRouter.getParam('showId')});
	}
})