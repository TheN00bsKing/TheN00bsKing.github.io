var path = "../images/headerGallery/";
var backgrounds = [
    "1.jpg",
    "2.jpg",
    "3.jpg"
];
var current = 0;

function nextBackground() {
    "use strict";
    alert("changing backgound to " + path + backgrounds[current]);
    Document.getElementById("test1").style.opacity = 1;
    if(current == backgrounds.length - 1) {
        current = 0;
    } else {
        current++;
    }
    Document.getElementById("test1").style.opacity = 0;
}

function lastBackground(){
    "use strict";
    alert("changing backgound to " + path + backgrounds[current]);
    document.getElementById("test1").style.opacity = 1;
    if(current == 0) {
        current = backgrounds.length - 1;
    } else {
        current--;
    }
    document.getElementById("test1").style.opacity = 0;
}

function backgoundLoop() {
    "use strict";
    nextBackground();
    setTimeout(backgoundLoop, 5000);
}
backgoundLoop();
