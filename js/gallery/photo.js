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

function encodePicture(photo) {
	var img = document.createElement("img");
	img.setAttribute("src", photo.images[0].source);
	
	var thumbnail = document.createElement("img");
	for(var i = 3; i > 0; i--)
		if(photo.images[i]) {
			thumbnail.setAttribute("src", photo.images[i].source);
			break;
		}
	thumbnail.className = "thumbnail";
	
	var title = document.createElement("span");
	title.className = "title";
	var likeIcon = document.createElement("i");
	likeIcon.className = "fa fa-thumbs-up";
	var likes;
	if(photo.likes)
		likes = photo.likes.data.length;
	else
		likes = 0;
	var likeCount = document.createTextNode(" " + likes);
	title.appendChild(likeIcon);
	title.appendChild(likeCount);
	
	var desc = document.createElement("span");
	desc.className = "desc";
	var link = document.createElement("a");
	link.setAttribute("href", photo.link);
	var facebook = document.createElement("i");
	facebook.className ="fa fa-facebook-official";
	var text = document.createTextNode("View on Facebook");
	link.appendChild(facebook);
	link.appendChild(text);
	desc.appendChild(link);
	
	var container = document.getElementById("galleria");
	container.appendChild(img);
	container.appendChild(title);
	container.appendChild(desc);
	
}

function encodeError(text) {
	var div = document.getElementById("error");
	var h1 = div.getElementsByTagName("h1");
	h1[0].innerText = text;
	h1[0].style.display = "block";
	alert(text);
}

function initPage() {
	if(QueryString.id){
		getData(QueryString.id + "?fields=id, name, link, photos{likes, images, link}", function (album) {
			if(album){
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
	}else{
		encodeError("לא נבחר אלבום");
	}
	if(QueryString.photo)
		Galleria.configure("show", QueryString.photo);
}