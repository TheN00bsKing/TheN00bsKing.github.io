function toggleSC(){
    $("#mPlayer iframe").slideToggle();
    $("#mPlayer .extend").fadeToggle();
}

function SCexpand() {
    $("#mPlayer iframe").toggleClass("expand");
    $("#mPlayer .play").fadeToggle();
    $("#mPlayer .extend").toggleClass("fa-expand");
    $("#mPlayer .extend").toggleClass("fa-compress");
}

$(document).ready(function() {
    $("#mPlayer .play").click(toggleSC());
    $("#mPlayer .extend").click(SCexpand());
});