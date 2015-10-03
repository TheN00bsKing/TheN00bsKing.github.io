$(document).ready(function() {
    $("#menu").waypoint('sticky');
    
    $("#menu ul li").hover(function() {
        $(this).find("ul").stop().slideToggle();
    });
    $("#handle").click(function() {
        $("#menu ul:first").slideToggle();
    });
});