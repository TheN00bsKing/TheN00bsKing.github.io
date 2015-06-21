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

var accessToken = "CAACEdEose0cBAFaCRrgl6UrAhv3SQqzexHoTwcOJumjpskbF3QZAoGkl1GI1DGbT63eV2I6ytKydCZBsvAeDfSHDJ7v6Gk7S3RRpmxRc7193ftU9ZC3yPU4nCt607TvJVpv7jrnlWDVryU9KpZB1N9qC3CBG5nq4IA4gkZBZC5XWhTdCwUSTTZBPIgNjRIBIXGOd1qcktSuXS20Bve5DZA8j2K7zZB64vXOgZD"

function getEvents() {
    FB.api(
        "/Red.Sub.2003/events", 
        {access_token: accessToken},
        function (response) {
            if (response && !response.error) {
                for (var i = 0; i < response.data.length; i++) {
                    var event = response.data[i];
                    $("#grid").append("<br> <a href='https://www.facebook.com/events/" + event.id +"' >" + event.name + "</a>");
                }
            } else {
                alert(response.error.message);
            }
        }
    ); 
            
}