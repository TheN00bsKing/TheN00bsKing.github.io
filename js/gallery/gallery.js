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
            }
        }
    );
}

function encodeLikeButton(link) {
    var div = document.createElement("div");
    div.setAttribute("class", "fb-like");
    div.setAttribute("data-href", link);
    div.setAttribute("data-width", "50");
    div.setAttribute("data-layout", "standard");
    div.setAttribute("data-action", "like");
    div.setAttribute("data-show-faces", "true");
    div.setAttribute("data-share", "true");
    return div;
}

function encodeThumbnail(album) {
    
    var h1 = document.createElement("h1");
    var name = document.createTextNode(album.name);
    h1.appendChild(name);
    
    var h2 = document.createElement("h2");
    var count = document.createTextNode(album.count);
    h2.appendChild(count);
    
    var likeButton = encodeLikeButton(album.link);
    
    var details = document.createElement("div");
    details.setAttribute("class", "details")
    details.appendChild(h1);
    details.appendChild(h2);
    details.appendChild(likeButton);
    
    var imageURL = album.photos.data[0].images[0].source;
    var img = document.createElement('img');
    img.setAttribute("src", "" + imageURL);
    
    var image = document.createElement("div");
    image.setAttribute("class", "image");
    image.setAttribute("onclick", "href(" + album.link + ");");
    image.appendChild(img);
    image.appendChild(details);
    
    var gridItem = document.createElement("div");
    gridItem.setAttribute("class", "grid-item");
    gridItem.appendChild(image);
    
    var grid = document.getElementById("grid-container");
    grid.appendChild(gridItem);
    
    FB.XFBML.parse(document.getElementById(album.id));
}

function printAlbums() {
    getData("Red.Sub.2003/albums?fields=id, name, link, count, description, photos", function (response) {
        var albums = response.data;
        for (var i = 0; i < albums.length; i++) {
            var album = albums[i];
            encodeThumbnail(album);
        }
    });
    
}

function href(link) {
    window.location.href = link;
}
