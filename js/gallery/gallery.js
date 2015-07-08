window.fbAsyncInit = function() {
    FB.init({
        appId      : '640939622674569',
        xfbml      : true,
        version    : 'v2.3'
    });
};
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}
(document, 'script', 'facebook-jssdk'));

var accessToken = "640939622674569|0RxuhIyPrp9_DQyo-UQ9lI9R4YY";

function getData(node, callback) {
    'use strict';
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

function getImage(id, callback) {
    getData(id, function(response) {
        alert(response.images[0].source);
        callback(response.images[0].source);
    });
}

function printAlbums() {
    getData("Red.Sub.2003/albums", function(response) {
        var albums = response.data;
        alert(albums.length);
        for (var i = 0; i < albums.length; i++) {
            var album = albums[i];
            encodeThumbnail(album);
            alert(album.name);
        }
    });
}

function encodeThumbnail(album) {
    var code = "<li><figure onclick='href('";
    code += "" + album.link;
    code += "');'><img src='";
    var coverID = album.cover_photo;
    getImage(coverID, function(response) {
        alert(response);
        code += "" + response; 
    });
    code += "'><figcaption><h3>";
    code += "" + album.name;
    code += "</h3><h4>";
    code += album.count + "תמונות ";
    code += "<h5><i class='fa fa-thumbs-up'></i>" + album.likes.data.length + "</h5>";
    code += "</figcaption></figure></li>";
    $("#grid").append(code);
}

function href(link) {
    window.location.href = link;
}
