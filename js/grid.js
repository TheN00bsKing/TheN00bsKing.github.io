var stackgrid = new Stackgrid;

// Configurate your stackgrid options here.

//size on load
if(window.innerWidth < 765) {
    stackgrid.config.columnWidth = 240;
}else{
    stackgrid.config.columnWidth = 320;
}

//resize on window resize
$(window).resize(function() {
    var windowSize = window.innerWidth;
    if(windowSize < 765){
        stackgrid.config.columnWidth = 240;
        stackgrid.reset();
    } else {
        stackgrid.config.columnWidth = 320;
        stackgrid.reset();
    }
});

stackgrid.config.gutter = 20; //padding
stackgrid.config.isFluid = true; //auto select number of columns

// Currently there are two layout options: "ordinal", and "optimized"
stackgrid.config.layout = "optimized";
stackgrid.config.numberOfColumns = 4;
stackgrid.config.resizeDebounceDelay = 350;

// One way to make sure everything is loaded is
// to wrap the initializer inside window onload.
window.onload = function() {

  // The initializer takes in two arguements:
  // the grid container selector, and the grid items selector
  stackgrid.initialize('#grid-container', '.grid-item');

};