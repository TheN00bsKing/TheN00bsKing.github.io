$(document).ready(function() {
    $("#mPlayer .play").click(function() {
        $("#mPlayer #sc-widget").slideToggle();
        $("#mPlayer .extend").fadeToggle();
    });
    $("#mPlayer .extend").click(function() {
        $("#mPlayer iframe").toggleClass("expand");
        $("#mPlayer .play").fadeToggle();
        $("#mPlayer .extend").toggleClass("fa-expand");
        $("#mPlayer .extend").toggleClass("fa-compress");
    });
});
(function(){
    var widgetIframe = document.getElementById('sc-widget'), widget = SC.Widget(widgetIframe);
    widget.bind(SC.Widget.Events.READY, function() {
        widget.bind(SC.Widget.Events.PLAY, function() {
            // get information about currently playing sound
            widget.getCurrentSound(function(currentSound) {
            });
        });
        // set new volume level
        $("#SC-volume").on("slide", function(event, ui) {
            widget.setVolume(ui.value / 100);
        });
        //toggle volume button
        widget.bind(SC.Widget.Events.PLAY, function() {
            $("#mPlayer #volume").fadeIn();
        });
        widget.bind(SC.Widget.Events.PAUSE , function() {
            $("#mPlayer #volume").fadeOut();
        });
    });
}());
$("#SC-volume").slider({
    min: 0,
    max: 100,
    value: 75
});