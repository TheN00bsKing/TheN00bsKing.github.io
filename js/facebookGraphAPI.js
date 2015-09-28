window.fbAsyncInit = function() {
	FB.init({
		appId : '640939622674569',
		xfbml : true,
		version : 'v2.4'
	});
};
(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function getData(node, callback) {
	//facebook config
	var accessToken = "640939622674569|0RxuhIyPrp9_DQyo-UQ9lI9R4YY";

    FB.api(
        "/" + node, 
        "GET",
        {access_token: accessToken},
        function (response) {
            if (response && !response.error) {
                callback(response);
            } else {
				console.error(response.error);
            }
        }
    );
}
