var current = 0;
var ablImages = 3;
var delay = 10;
function numToString(i){
    return "HI" + (i + 1);
}

function nextBackground() {
    var selected = numToString(current);
    document.getElementById(selected).style.opacity = 0;
    if(current == ablImages - 1) {
        current = 0;
    } else {
        current++;
    }
    selected = numToString(current);
    document.getElementById(selected).style.opacity = 1;
}

function lastBackground(){
    document.getElementById(numToString(current)).style.opacity = 0;
    if(current == 0) {
        current = ablImages - 1;
    } else {
        current--;
    }
    document.getElementById(numToString(current)).style.opacity = 1;
}

function backgoundLoop() {
    nextBackground();
    setTimeout(backgoundLoop, delay * 1000);
}

backgoundLoop();
