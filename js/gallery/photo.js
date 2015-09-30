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
		updateParameter("photos", e.index);
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
	thumbnail.setAttribute("src", photo.images[photo.images.length - 1].source);
	img.appendChild(thumbnail);
	
	var like = document.createElement("fb:like");
	alert(photo.link);
	like.setAttribute("href", photo.link);
	img.setAttribute("data-layer", like.innerHTML);
	
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
	if(urlParameters.id){
		getData(urlParameters.id + "?fields=id, name, link, photos{likes, images, link}", function (album) {
			if (album) {
				var head = document.head.children;
				for (var i = 0; i < head.length; i++) {
					if (head[i].localName == "title")
						head[i].textContent += " - " + album.name;
				}
				var photos = album.photos.data;
				if (photos) {
					for (var i = 0; i < photos.length; i++) {
						encodePicture(photos[i]);
						console.log("encode photo " + (i + 1) + " / " + photos.length);
					}
					runGalleria();
				} else {
					encodeError("לא נמצאו תמונות");
				}
			} else {
				encodeError("אלבום לא נמצא");
			}
		});
		var back = document.getElementById("back");
		var link = back.getElementsByTagName("a").item(0);
		link.setAttribute("href", "album.html?id=" + urlParameters.id)
	}else{
		encodeError("לא נבחר אלבום");
	}
	if(urlParameters.photo)
		Galleria.configure("show", urlParameters.photo);
	FB.XFBML.parse(document.getElementById("galleria"));
}
