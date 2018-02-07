Template.kuzuStats.onCreated(function(){
  this.autorun(() => {
    this.subscribe("listenerStats");
  })
})

Template.kuzuStats.rendered=function() {
  $('#dateFrom').datepicker();
  $('#dateTo').datepicker();
  /*$('#dateFromRange').datepicker();
  $('#dateToRange').datepicker();*/ //needs to be date time picker
}

Template.kuzuStats.events({
  "click [data-get-listening-hours]"(){
    var startDate = $("#dateFrom").val()
    var endDate = $("#dateTo").val();
    if(startDate && endDate){
      Meteor.call("getListenerHours", new Date(startDate), new Date(endDate) , function(err, res){
        alert(res);
      } );
    }
    else {
      alert("You need start date and end date");
    }    
  }
})

Template.kuzuStats.helpers({
  kuzuLineChart() {
    var listenerArray = ListenerStats.find({}, {sort: {"fetchDate": 1}}).fetch();//only look for last 8 hours
    var plotListener = [];
    var alignment = 0;
    listenerArray.forEach(function(aa){
      plotListener.push([new Date(aa.fetchDate).getTime(), aa.numListeners || 0])
    })
    return {
        chart: {
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          plotBorderWidth: null,
          plotShadow: false,
          plotBackgroundColor: 'rgba(255, 255, 255, 0.0)',
          //marginTop: "20px"
        },
        events: {
          load: function(){
            console.log("wowoowws")
    
          }
        },
        colors: ["#F15822"],
        title: {
            text: ""
        },
        labels: {
          style: {
            "color": "#F15822"
          }
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Time'
          },
          labels: {
            formatter: function () {
              return moment(new Date(this.value)).format("hh:mm a");
            }
          }
        },
        yAxis: {
          title: {
            text: 'Kuzu Online Streaming Listeners'
          },
        },
        series: [{
          type: 'line',
          name: 'Kuzu Online Streaming Listeners',
          data: plotListener
        }]
    };
  }
});