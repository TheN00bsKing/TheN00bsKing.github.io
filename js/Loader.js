document.write("<link rel='stylesheet' href='css/loaders.min.css'>");
document.write("<link rel='stylesheet' href='css/loader.css'>");
document.write("<div id='loadingScreen'><div id='loadAnination'><div class='loader-inner line-scale-party'><div></div><div></div><div></div><div></div></div></div></div>");
(function () {
    if (window.addEventListener) {
        window.addEventListener("load", hideLoadingScreen, false);
    }
    else {
        window.attachEvent("onload", hideLoadingScreen);
    }
})();


function hideLoadingScreen() {
    document.getElementById("loadingScreen").style.opacity = "0";
    setTimeout(function(){
        document.getElementById("loadingScreen").style.display = "none";
    }, 6000);
}
