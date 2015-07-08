var stackgrid = new Stackgrid;

// Configurate your stackgrid options here.
stackgrid.config.columnWidth = 320;
stackgrid.config.gutter = 20;
stackgrid.config.isFluid = false;

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