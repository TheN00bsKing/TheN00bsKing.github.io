var menu = function () {
	function getTab(docTab) {
		var tabObject = {};
		var attrs = docTab.attributes;
		for (var i = 0; i < attrs.length; i++) {
			tabObject[attrs[i].localName] = attrs[i].textContent;
		}
		if (docTab.children.length > 0) {
			var tabArray = new Array(docTab.children.length);
			for (var j = 0; j < docTab.children.length; j++) {
				tabArray[j] = getTab(docTab.children[j]);
			}
			tabObject["subTabs"] = tabArray;
		}
		return tabObject;
	}
	
	var xmlhttp, xmlDoc;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "data/Menu.xml", false);
	xmlhttp.send();
	if (xmlhttp.status == 404) {
		console.error("מידע לא נמצא");
	}
	xmlDoc = xmlhttp.responseXML;
	
	var docMenu = xmlDoc.childNodes[0];
	var docTabList = docMenu.children;
	var tabArray = new Array(docTabList.length);
	for (var i = 0; i < tabArray.length; i++) {
		tabArray[i] = getTab(docTabList[i]);
	}
	return tabArray;
}();

//menu print code
var url = window.location.pathname;
var currentTab = url.substring(url.lastIndexOf('/')+1);

function href(link) {
    window.location.href = link;
}

function encodeTab(tab) {
	var a = document.createElement("a");
	a.innerText = tab.name;
	var li = document.createElement("li");
	li.appendChild(a);
	if (tab.subTabs) {
		var ul = document.createElement("ul");
		for (var i = 0; i < tab.subTabs.length; i++) {
			var subTab = encodeTab(tab.subTabs[i]);
			ul.appendChild(subTab);
		}
		li.appendChild(ul);
	} else {
		li.setAttribute("onclick", "href('" + tab.link + "');");
	}
	if (tab.link == currentTab) 
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
	if (currentTab != "index.html") {
		var home = {
			name: "דף הבית",
			link: "index.html"
		};
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
	var handle = document.createElement("div");
	handle.setAttribute("id", "handle");
	handle.innerText = "תפריט";
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