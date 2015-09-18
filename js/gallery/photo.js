//URL parameter getter
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

//facebook config
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

//Galleria config
Galleria.loadTheme('js/gallery/Galleria/galleria.classic.min.js');

Galleria.configure({
	imageCrop: "landscape",
	transition: "slide",
	swip: "enforced",
	extend: function toggleSlideshow() {
		var div = document.getElementById("play");
		var icon = document.getElementsByTagName("i").item(0);
		if(icon.className == "fa fa-pause"){
			this.play();
			icon.className = "fa fa-pause";
		}else{
			this.pause();
			icon.className = "fa fa-play-circle";
		}
	}
});

Galleria.ready(function(options) {
	this.bind('image', function(e) {
		var newURL = window.location.href;
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if(pair[0] == "photo"){
				newURL = newURL.replace(vars[i], "photo=" + e.index);
			}
		}
		window.history.pushState('', '', newURL);
	});
});

function runGalleria() {
	Galleria.run('.galleria');
}

function toggleSlideshow() {
	var div = document.getElementById("play");
	var icon = document.getElementsByTagName("i").item(0);
	if(icon.className == "fa fa-play-circle"){
		Galleria.play();
		icon.className = "fa fa-pause";
	}else{
		Galleria.pause();
		icon.className = "fa fa-play-circle";
	}
}

//init page
function encodePicture(photo) {
	var img = document.createElement("a");
	img.setAttribute("href", photo.images[0].source);
	
	var thumbnail = document.createElement("img");
	for(var i = 3; i > 0; i--)
		if(photo.images[i]) {
			thumbnail.setAttribute("src", photo.images[i].source);
			break;
		}
	
	img.appendChild(thumbnail);
	
	var likeIcon = document.createElement("i");
	likeIcon.className = "fa fa-thumbs-up";
	var likes;
	if(photo.likes)
		likes = photo.likes.data.length;
	else
		likes = 0;
	var titleString = likeIcon.innerHTML + likes;
	
	img.setAttribute("data-title", titleString);
	
	var link = document.createElement("a");
	link.setAttribute("href", photo.link);
	var facebook = document.createElement("i");
	facebook.className ="fa fa-facebook-official";
	var text = document.createTextNode("View on Facebook");
	link.appendChild(facebook);
	link.appendChild(text);
	
	img.setAttribute("data-description", link.innerHTML);
	
	var container = document.getElementById("galleria");
	container.appendChild(img);
	
}

function encodeError(text) {
	var div = document.getElementById("error");
	var h1 = div.getElementsByTagName("h1");
	h1[0].innerText = text;
	h1[0].style.display = "block";
	//alert(text);
}

function initPage() {
	if(QueryString.id){
		getData(QueryString.id + "?fields=id, name, link, photos{likes, images, link}", function (album) {
			if(album){
				var head = document.head.children;
				for (var i = 0; i < head.length; i++) {
					if (head[i].localName == "title")
						head[i].textContent += " - " + album.name;
				}
				var photos = album.photos.data;
				if(photos){
					for(var i = 0; i < photos.length; i++){
						encodePicture(photos[i]);
						console.log("encode photo " + (i + 1) + " / " + photos.length);
					}
					runGalleria();
				}else{
					encodeError("לא נמצאו תמונות");
				}
			}else{
				encodeError("אלבום לא נמצא");
			}
		});
		var back = document.getElementById("back");
		var link = back.getElementsByTagName("a").item(0);
		link.setAttribute("href", "album.html?id=" + QueryString.id)
	}else{
		encodeError("לא נבחר אלבום");
	}
	if(QueryString.photo)
		Galleria.configure("show", QueryString.photo);
}