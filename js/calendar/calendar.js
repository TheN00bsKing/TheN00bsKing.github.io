$(document).ready(function() {

    // page is now ready, initialize the calendar...

    $("#calendar").fullCalendar({
		lang: "he",
        googleCalendarApiKey: "AIzaSyAXZfZr8k4qFxc6iXS4BLiOb6uaYYIbkZk",
        events: {
            googleCalendarId: "hucufn59tl22b1fr3357r2m1u0@group.calendar.google.com"
        },
		googleCalendarError: function(error) {
			alert("Google Calendar Error: " + error.message);
			console.error(error);
		},
		header: {
			left:   'month agendaWeek agendaDay',
			center: 'title',
			right:  'today prev,next'
		},
		dayClick: function(date) {
			viewDate(date);
		},
		eventClick: function(event) {
			showEvent(event);
			return false;
		},
		windowResize: function() {
			if(window.innerWidth < 765)
				$('#calendar').fullCalendar('option', 'height', window.innerHeight - 143);
			else
				$('#calendar').fullCalendar('option', 'height', "auto");
		},
		height: getHeight()
    })

});

function getHeight() {
	if(window.innerWidth < 765)
		return window.innerHeight - 143;
	else
		return "auto";
}

function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}

function viewDate(date) {
	$("#calendar").fullCalendar("changeView", "agendaDay" );
	$("#calendar").fullCalendar("gotoDate", date);
}

function showEvent(event) {
	$("#eventData h1").html(event.title);
	var start = new Date(event.start);
	var end = new Date(event.end);
	var dateOptions = {
		weekday: "long", 
		year: "numeric", 
		month: "long", 
		day: "numeric"
	};
	var timeOptions = {
		hour: "2-digit",
		minute: "2-digit"
	};
	$("#eventData h2").html(start.toLocaleString("he-IL", dateOptions))
	$("#eventData h3").html(start.toLocaleString("he-IL", timeOptions));
	if(end)
		$("#eventData h3").append(" - " + end.toLocaleString("he-IL", timeOptions));
	
	if(event.url){
		$("#eventData a").attr("href", event.url);
		$("#eventData a").html(extractDomain(event.url));
	}
	
	if(event.allDay)
		$("#eventData i:first").show();
	else
		$("#eventData i:first").hide();
	
	
	
	
	$("#event").fadeIn();
}

$(document).ready(function() {
	$("#event").click(function() {
		$("#event").fadeOut();
	});
});