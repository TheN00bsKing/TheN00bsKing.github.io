function Tab(name, link, sub) {
	this.name = name;
	if (link === undefined || link == "")
		this.link = "development.html";
	else
		this.link = link;
	this.sub = sub;
}

var menu = new Array();
menu[0] = new Tab("עדכונים", "events.html");
menu[1] = new Tab("לוח חדר חזרות");

var gallery = new Array();
gallery[0] = new Tab("מוזיקה");
gallery[1] = new Tab("תמונות", "gallery.html");
gallery[2] = new Tab("סרטונים");

menu[2] = new Tab("גלריה", "", gallery);
menu[3] = new Tab("חנות", "shop.html");
menu[4] = new Tab("צור קשר");
menu[5] = new Tab("אודות");


var url = window.location.pathname;
var currentTab = url.substring(url.lastIndexOf('/')+1);

function href(link) {
    window.location.href = link;
}

function encodeTab(tab) {
	var a = document.createElement("a");
	var name = document.createTextNode(tab.name);
	a.appendChild(name);
	var li = document.createElement("li");
	li.appendChild(a);
	if (tab.sub) {
		var ul = document.createElement("ul");
		for (var i = 0; i < tab.sub.length; i++) {
			var subTab = encodeTab(tab.sub[i]);
			ul.appendChild(subTab);
		}
		li.appendChild(ul);
	} else {
		li.setAttribute("onclick", "href('" + tab.link + "');");
	}
	if (tab.link == current) 
		li.setAttribute("class", "current");
	return li;
}

function encodeMenu() {
	console.log("Encoding menu");
	var menuCSS = document.createElement("link");
	menuCSS.setAttribute("rel", "stylesheet");
	menuCSS.setAttribute("href", "css/menu.css");
	
	var script1 = document.createElement("script");
	script1.setAttribute("src", "bower_components/jquery-waypoints/waypoints.js");
	script1.setAttribute("type", "text/javascript");
	script1.setAttribute("onload", "loadMenuScript(0);");
	
	//logo div
	var logoImage = document.createElement("img");
	logoImage.setAttribute("src", "images/red-sub-logo.png")
	logoImage.setAttribute("width", "auto");
	logoImage.setAttribute("height", "47px");
	logoImage.setAttribute("onclick", "href('index.html');");

	var logo = document.createElement("div");
	logo.appendChild(logoImage);
	
	//ul element
	var ul = document.createElement("ul");
	ul.appendChild(logo);
	
	//home tab
	if (current != "index.html") {
		var home = new Tab("דף הבית", "index.html");
		var homeTab = encodeTab(home);
		ul.appendChild(homeTab);
	}

	//tabs elements loop
	for (var i = 0; i < menu.length; i++) {
		var tab = encodeTab(menu[i]);
		ul.appendChild(tab);
	}

	//handle element
	var handleIcon = document.createElement("i");
	handleIcon.setAttribute("class", "fa fa-bars");
	var handleName = document.createTextNode("תפריט");
	var handle = document.createElement("div");
	handle.setAttribute("id", "handle");
	handle.appendChild(handleName);
	handle.appendChild(handleIcon);
	
	//nav element
	var nav = document.createElement("nav");
	nav.setAttribute("id", "menu");
	
	nav.appendChild(ul);
	nav.appendChild(handle);
	
	//adding menu to the body
	var body = document.body;
	body.appendChild(nav);
	
	var head = document.head;
	head.appendChild(menuCSS);
	head.appendChild(script1);
}

function loadMenuScript(num) {
	if (num == 0) {
		var script = document.createElement("script");
		script.setAttribute("src", "bower_components/jquery-waypoints/shortcuts/sticky-elements/waypoints-sticky.js");
		script.setAttribute("type", "text/javascript");
		script.setAttribute("onload", "loadMenuScript(1);");
		document.head.appendChild(script);
	} else if (num == 1) {
		var script = document.createElement("script");
		script.setAttribute("src", "js/stickyMenu.js");
		script.setAttribute("type", "text/javascript");
		document.body.appendChild(script);
	}
	
}

encodeMenu();