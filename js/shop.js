var xmlhttp, xmlDoc;
xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "data/Shop.xml", false);
xmlhttp.send();
if (xmlhttp.status == 404) {
	encodeError("מידע לא נמצא")
}
xmlDoc = xmlhttp.responseXML;

var shop = function () {
	var shopObject = {};
	var docShop = xmlDoc.childNodes[0];
	var docInfo = docShop.getElementsByTagName("Info");
	var info = new Array(docInfo.length);
	for(var i = 0; i < info.length; i++) {
		info[i] = function (){
			var infoObject = {};
			var attrs = docInfo[i].attributes;
			for (var j = 0; j < attrs.length; j++) {
				infoObject[attrs[j].localName] = attrs[j].textContent;
			}
			var childs = docInfo[i].children;
			for(var j = 0; j < childs.length; j++) {
				infoObject[childs[j].tagName] = childs[j].textContent;
			}
			infoObject["content"] = docInfo[i].textContent;
			return infoObject;
		}();
	}
	shopObject["info"] = info;
	
	var docItems = docShop.getElementsByTagName("Item");
	var items = new Array(docItems.length);
	for (var i = 0; i < items.length; i++) {
		items[i] = function () {
			var itemObject = {};
			var attrs = docItems[i].attributes;
			for (var j = 0; j < attrs.length; j++) {
				itemObject[attrs[j].localName] = attrs[j].textContent;
			}
			var childs = docItems[i].children;
			for(var j = 0; j < childs.length; j++) {
				itemObject[childs[j].tagName] = childs[j].textContent;
			}
			return itemObject;
		}();
	}
	shopObject["items"] = items;
	return shopObject;
}();
console.log(shop);

function encodeError(text) {
	var div = document.getElementById("error");
	var h1 = div.getElementsByTagName("h1");
	h1[0].innerText = text;
	h1[0].style.display = "block";
	console.error(text);
}

function encodeItem(item) {
	var image = document.createElement("img");
	if (item.Image)
		image.setAttribute("src", item.Image);
	else 
		image.setAttribute("src", "images/noImage.jpg");
	
	var h1 = document.createElement("h1");
	h1.innerText = item.Name;
	
	var p = document.createElement("p");
	p.innerText = item.Desc;
	
	var price = document.createElement("h2");
	var icon = document.createElement("i");
	icon.className = "fa fa-ils";
	price.appendChild(icon);
	price.innerHTML += " " + item.Price;
	
	var gridItem = document.createElement("div");
    gridItem.setAttribute("class", "grid-item");
    gridItem.appendChild(image);
	gridItem.appendChild(h1);
	gridItem.appendChild(p);
	gridItem.appendChild(price);
    
    var grid = document.getElementById("grid-container");
    grid.appendChild(gridItem);
	console.log("printed item " + item.id + "/" + shop.items.length);
}

function encodeInfo(name, text) {
	var p = document.createElement("p");
	var strong = document.createElement("strong");
	strong.innerText = name;
	p.appendChild(strong);
	p.innerHTML += " " + text;
	
	var infoDiv = document.getElementById("info");
	infoDiv.appendChild(p);
	
}

function initPage() {
	for (var i = 0; i < shop.info.length; i++) {
		encodeInfo(shop.info[i].text, shop.info[i].content);
	}
	for (var i = 0; i < shop.items.length; i++){
		encodeItem(shop.items[i]);
	}
}