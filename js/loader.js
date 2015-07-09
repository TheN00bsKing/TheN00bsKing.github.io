function encodeLoadingScreen() {
    
    var animation = document.createElement("div");
    animation.setAttribute("class",  "loader-inner line-scale-pulse-out");
    for (var i = 0; i < 5; i++) {
        animation.appendChild(document.createElement("div"));
    }
    
    var loadingAmination = document.createElement("div");
    loadingAmination.setAttribute("id", "loadAnination");
    loadingAmination.appendChild(animation);
    
    var loadingScreen = document.createElement("div");
    loadingScreen.setAttribute("id", "loadingScreen");
    loadingScreen.appendChild(loadingAmination);
    
    var loadCSS = document.createElement("link");
    loadCSS.setAttribute("rel", "stylesheet");
    loadCSS.setAttribute("href", "css/loader.css");
    
    var animationCSS = document.createElement("link");
    animationCSS.setAttribute("rel", "stylesheet");
    animationCSS.setAttribute("href", "css/loaders.min.css");
    
    var body = document.body;
    body.appendChild(loadCSS);
    body.appendChild(animationCSS);
    body.appendChild(loadingScreen);
    
}

function hideLoadingScreen() {
    document.getElementById("loadingScreen").style.opacity = "0";
    setTimeout(function () {
        document.getElementById("loadingScreen").style.display = "none";
    }, 1500);
}

(function () {
    encodeLoadingScreen();
    if (window.addEventListener) {
        window.addEventListener("load", hideLoadingScreen, false);
    } else {
        window.attachEvent("onload", hideLoadingScreen);
    }
})();
