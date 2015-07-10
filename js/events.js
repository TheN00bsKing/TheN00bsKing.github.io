function initEvents() {
	var script = document.createElement("script");
	script.setAttribute("src", "http://connect.facebook.net/en_US/all.js");
	script.setAttribute("onload", "initFacebook();")

	var eventCSS = document.createElement("link");
	eventCSS.setAttribute("rel", "stylesheet");
	eventCSS.setAttribute("href", "css/events.css");

	var head = document.head;
	head.appendChild(script);
	head.appendChild(eventCSS);
	
	var titleH1 = document.createElement("h1");
	titleH1.innerHTML = "לוח אירועים קרובים";
	
	var title = document.createElement("div");
	title.setAttribute("class", "event");
	title.setAttribute("id", "eventsTitle");
	title.appendChild(titleH1);

	var grid = document.createElement("div");
	grid.setAttribute("id", "events");
	grid.appendChild(title);

	var body = document.body;
	body.appendChild(grid);
}
initEvents();

var accessToken = "640939622674569|0RxuhIyPrp9_DQyo-UQ9lI9R4YY";

function getData(node, callback) {
    FB.api(
        "/" + node, 
        "GET",
        {access_token: accessToken},
        function (response) {
            if (response && !response.error) {
                callback(response);
            } else {
                alert(response.error.message);
				console.error(response.error);
            }
        }
    );
}

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
	var placeString = document.createTextNode(place.name + " - " + location.city + ", " + location.country);
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

function printEvents() {
	getData("Red.Sub.2003/events?fields=id,name,cover,place,start_time", function (response) {
        var events = response.data;
        for (var i = 0; i < events.length; i++) {
            var event = events[i];
            encodeEvent(event);
        }
    });
}

function initFacebook() {
	window.fbAsyncInit = function() {
		FB.init({
			appId      : '640939622674569',
			xfbml      : true,
			version    : 'v2.3'
		});
	};

	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	
	printEvents();
}