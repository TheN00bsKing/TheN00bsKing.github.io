document.write("<link rel='stylesheet' href='css/loader.css'><link rel='stylesheet' href='css/loaders.min.css'> <div id='loadingScreen'><div id='loadAnination'><div class='loader-inner line-scale-pulse-out'><div></div><div></div><div></div><div></div><div></div></div></div></div>");

function hideLoadingScreen() {
    document.getElementById("loadingScreen").style.opacity = "0";
    setTimeout(function () {
        document.getElementById("loadingScreen").style.display = "none";
    }, 4000);
}

(function () {
    if (window.addEventListener) {
        window.addEventListener("load", hideLoadingScreen, false);
    } else {
        window.attachEvent("onload", hideLoadingScreen);
    }
})();