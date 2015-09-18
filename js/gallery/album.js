var QueryString = function () {
	// This function is anonymous, is executed immediately and 
	// the return value is assigned to QueryString!
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		// If first entry with this name
		if (typeof query_string[pair[0]] === "undefined") {
			query_string[pair[0]] = decodeURIComponent(pair[1]);
			// If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
			var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
		} else {
			query_string[pair[0]].push(decodeURIComponent(pair[1]));
		}
	} 
	return query_string;
}();

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
				encodeError("קוד אלבום לא תקין");
				console.error(response.error);
            }
        }
    );
}

function encodeThumbnail(photo, link) {
	
    var img = document.createElement('img');
    img.setAttribute("src", "" + photo.images[2].source);
	
	var image = document.createElement("div");
    image.setAttribute("class", "image");
    image.setAttribute("onclick", "href('" + link + "');");
    image.appendChild(img);
	
	var gridItem = document.createElement("div");
    gridItem.setAttribute("class", "grid-item");
    gridItem.appendChild(image);
	
    var grid = document.getElementById("grid-container");
    grid.appendChild(gridItem);
}

function encodeHeader(name, link) {
	var header = document.getElementById("header");
	var h1 = header.getElementsByTagName("h1");
	h1[0].innerHTML = "";
	var icon = document.createElement("i");
	icon.className = "fa fa-th";
	h1[0].appendChild(icon);
	var name = document.createTextNode(" " +name);
	h1[0].appendChild(name);
	
	var a = header.getElementsByTagName("a");
	a[0].setAttribute("href", link);
}

function encodeError(text) {
	var div = document.getElementById("error");
	var h1 = div.getElementsByTagName("h1");
	h1[0].innerText = text;
	h1[0].style.display = "block";
}

function initPage() {
	if(QueryString.id){
		getData(QueryString.id + "?fields=id, name, link, photos", function (album) {
			if(album){
				var head = document.head.children;
				for (var i = 0; i < head.length; i++) {
					if (head[i].localName == "title")
						head[i].textContent += " - " + album.name;
				}
				encodeHeader(album.name, album.link);
				var photos = album.photos.data;
				if(photos){
					for(var i = 0; i < photos.length; i++){
						var link = "photo.html?id=" + QueryString.id + "&photo=" + i;
						encodeThumbnail(photos[i], link);
					}
				}else{
					encodeError("לא נמצאו תמונות");
				}
			}else{
				encodeError("אלבום לא נמצא");
			}
		});
	}else{
		encodeError("לא נבחר אלבום");
	}
}