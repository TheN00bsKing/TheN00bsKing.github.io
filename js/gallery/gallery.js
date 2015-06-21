var images = JSON.parse(data);

function printGallery() {
    'use strict';
    var grid = "<li class='grid-sizer'></li>", i;
    for (i = 0; i < images.length; i++) {
        grid += "<li> <figure> <img src='";
        if(!images[i].image.indexOf("https://") == 0 && !images[i].image.indexOf("http://") == 0)
            grid += "images/gallery/";
        grid += images[i].image + "' /> <figcaption> <h3>" + images[i].title + "</h3> <p>" + images[i].description + "</p> </figcaption> </figure> </li>";
    }
    document.getElementById("grid").innerHTML = grid;
}

function printSlideshow() {
    'use strict';
    var slide = "", i;
    for (i = 0; i < images.length; i++) {
        slide += "<li> <figure> <figcaption> <h3>" + images[i].title + "</h3> <p>" + images[i].description + "</p> </figcaption> <img src='";
        if(!images[i].image.indexOf("https://") == 0 && !images[i].image.indexOf("http://") == 0)
            slide += "images/gallery/";
        slide += images[i].image + "' /> </figure> </li>";
    }
    document.getElementById("slideshow").innerHTML = slide;
}
