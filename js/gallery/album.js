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
	if(urlParameters.id){
		getData(urlParameters.id + "?fields=id, name, link, photos", function (album) {
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
						var link = "photo.html?id=" + urlParameters.id + "&photo=" + i;
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