Meteor.startup(function() {
  SyncedCron.stop()
  var shows = Shows.find({ autoStartEnd: true }).fetch()
  _.each(shows, function(show) {
    App.addAutoStartShow(show._id)
  })
})

App.addAutoStartShow = function(showId) {
  var show = Shows.findOne({ _id: showId })
  if (new Date(show.showStart).getTime() > new Date().getTime()) {
    var d = moment(show.showStart)
      .subtract(5, 'minutes')
      .toDate()
    if (d.getTime() < new Date().getTime()) {
      Shows.update({ _id: show._id }, { $set: { isArmedForAutoStart: true } })
    } else {
      SyncedCron.add({
        name: 'AutoStart_' + show._id,
        schedule: function(parser) {
          var d = moment(show.showStart)
            .subtract(5, 'minutes')
            .toDate()
          return parser
            .recur()
            .on(d)
            .fullDate()
        },
        job: function() {
          Shows.update(
            { _id: show._id },
            { $set: { isArmedForAutoStart: true } }
          )
          SyncedCron.remove('AutoStart_' + show._id)
        },
      })
    }
  }
  SyncedCron.start()
}

App.removeAutoStartShow = function(showId) {
  SyncedCron.remove('AutoStart_' + showId)
}

Meteor.methods({
  addAutoStartShow(showId) {
    App.addAutoStartShow(showId)
    Shows.update({ _id: showId }, { $set: { autoStartEnd: true } })
  },
  removeAutoStartShow(showId) {
    App.removeAutoStartShow(showId)
    Shows.update(
      { _id: showId },
      { $set: { autoStartEnd: false, isArmedForAutoStart: false } }
    )
  },
})
