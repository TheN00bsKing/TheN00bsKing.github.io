function Tab(name, link, sub) {
	this.name = name;
	this.link = link;
	this.sub = sub;
}

var menu = new Array(6);
menu[0] = new Tab("עדכונים", "events.html");
menu[1] = new Tab("לוח חדר חזרות");

var gallery = new Array(3);
gallery[0] = new Tab("מוזיקה");
gallery[1] = new Tab("תמונות", "gallery.html");
gallery[2] = new Tab("סרטונים");

menu[2] = new Tab("גלריה", "", gallery);
menu[3] = new Tab("חנות", "shop.html");
menu[4] = new Tab("צור קשר");
menu[5] = new Tab("אודות");

function encodeTab(tab) {
	var a = document.createElement("a");
	a.setAttribute("href", tab.link);
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
	}
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

	var logoLink = document.createElement("a");
	logoLink.setAttribute("href", "index.html");
	logoLink.appendChild(logoImage);

	var logo = document.createElement("div");
	logo.appendChild(logoLink);

	//ul element
	var ul = document.createElement("ul");
	ul.appendChild(logo);

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

window.addEventListener ("load", loadMenuScript, false);

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