document.head.write = " <link rel='stylesheet' href='css/loader.css'> <link rel='stylesheet' href='css/loaders.min.css'>";

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
