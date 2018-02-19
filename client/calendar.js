Template.calendar.helpers({
  options: function() {
    var self = Template.instance();
    return {
      header: {
        left:   'title',
        center: '',
        right:  'today prev,next'
      },
      // Add events to the calendar.
      events(start, end, timezone, callback) {
        Meteor.subscribe("calendarShows", start.toDate(), end.toDate());
        let data = Shows.find().fetch().map((session) => {
          session.start = session.showStart;
          session.end = session.showEnd;
          return session;
        });

        if (data) {
          callback(data);
        }
      },

      // Configure the information displayed for an "event."
      eventRender(session, element) {
        element.find('.fc-content').html(
            `<h4 class="title">${session.showName}</h4>`
        );
      },

      // Triggered when a day is clicked on.
      dayClick(date, session) {
        // Store the date so it can be used when adding an event to the EventData collection.
        
      },
    }
  }
});


Template.calendar.onCreated(function(){
  this.startDate = new ReactiveVar(moment(new Date()).subtract(1, "month").toDate());
  this.endDate = new ReactiveVar(moment(new Date()).add(1, "month").toDate());
  setTimeout(function(){
    $('.fc.fc-unthemed.fc-ltr').fullCalendar('refetchEvents');
  }, 1000);
});

//Template.calendar