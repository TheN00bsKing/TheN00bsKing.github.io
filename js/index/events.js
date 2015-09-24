function dayToString(number) {
    var weekday=new Array(7);
    weekday[0]="ראשון";
    weekday[1]="שני";
    weekday[2]="שלישי";
    weekday[3]="רביעי";
    weekday[4]="חמישי";
    weekday[5]="שישי";
    weekday[6]="שבת";
    
    return weekday[number];
}

function encodeEvent(event) {
	var h1 = document.createElement("h1");
	var title = document.createTextNode(event.name);
	h1.appendChild(title);
	
	var h2 = document.createElement("h2");
	var dateString = new Date(event.start_time);
	var day = dayToString(dateString.getDay());
	var options = {
		weekday: "long", 
		year: "numeric", 
		month: "long", 
		day: "numeric", 
		hour: "2-digit", 
		minute: "2-digit" 
	};
	var date = document.createTextNode(dateString.toLocaleString("he-IL", options));
	h2.appendChild(date);
	
	var h3 = document.createElement("h3");
	var place = event.place;
	var location = place.location;
	if (location)
		var placeString = document.createTextNode(place.name + " - " + location.city + ", " + location.country);
	else
		var placeString = document.createTextNode(place.name);
	h3.appendChild(placeString);
	
	var eventDiv = document.createElement("div");
	eventDiv.setAttribute("class", "event");
	eventDiv.setAttribute("id", event.id);
	eventDiv.setAttribute("onclick", "href('https://www.facebook.com/events/" + event.id + "');");
	if (event.cover)
		eventDiv.style.backgroundImage = "url('" + event.cover.source + "')";
	eventDiv.appendChild(h1);
	eventDiv.appendChild(h2);
	eventDiv.appendChild(h3);
	
	var grid = document.getElementById("events");
	grid.appendChild(eventDiv);
}

function initEvents() {
	getData("Red.Sub.2003/events?fields=id,name,cover,place,start_time", function (response) {
        var events = response.data;
        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            encodeEvent(event);
        }
    });
	
	getXMLData("data/Events.xml", function(response) {
		var events = function () {
			var docEvents = response.childNodes[0];
			var docEventList = docEvents.getElementsByTagName("Event");
			var eventsArray = new Array(docEventList.length);
			for (var i = 0; i < eventsArray.length; i++) {
				eventsArray[i] = docEventList[i].textContent;
			}
			return eventsArray;
		}();
		for (var i = 0; i < events.length; i++) {
			getData(events[i] + "?fields=id,name,cover,place,start_time", function (response) {
				encodeEvent(response);
			});
		}
	}, false);
}