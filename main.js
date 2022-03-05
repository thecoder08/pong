var { loadImage, createCanvas } = require('canvas');
var { images, render, keyDown, keyUp } = require('./render');
var canvas = createCanvas(500, 500);
var ctx = canvas.getContext('2d');

var Decoder = require('./png-decoder');
var decoder = new Decoder();

var x11 = require('x11');

x11.createClient(function(err, display) {
  if (err) {
    console.log('Error: Couldn\'t connect to X server!');
  }
  else {
    var X = display.client;
    var root = display.screen[0].root;
    main(root, X, display);
  }
});


function main(root, X, display) {
// create a window, map it, and create a graphics context
  var win = X.AllocID();
  X.CreateWindow(
     win, root,
     0, 0, 500, 500,
     0, 0, 0, 0, { eventMask: x11.eventMask.KeyPress|x11.eventMask.KeyRelease }
  );
  X.MapWindow(win);
  var gc = X.AllocID();
  X.CreateGC(gc, win);
  // load all images
  var loadedImages = {};
  for (let image in images) {
    loadImage(images[image]).then(function(loadedImage) {
      loadedImages[image] = loadedImage;
    });
  }
  // run this once a second
  var loopInterval = setInterval(function() {
    // render our canvas and get the PNG data
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 500, 500);
    render(loadedImages, ctx);
    var logo = {
      data : Buffer.from(decoder.parse(canvas.toBuffer('image/png'))),
      width : decoder._IHDR.width,
      height : decoder._IHDR.height
    };
    // do something with the pixels to make the colors right
    var rscreen = display.screen[0];
    var screen =
      rscreen.depths[rscreen.root_depth][
      Object.keys(rscreen.depths[rscreen.root_depth])[0]];
      var rmask = parseInt(screen.red_mask, 10);
    var gmask = parseInt(screen.green_mask, 10);
    var bmask = parseInt(screen.blue_mask, 10);
      for (var y = 0; y < logo.height; y++) {
      for (var x = 0; x < logo.width; x++) {
        var pixel = Buffer.from([
          logo.data[(x + logo.width * y) * 4],
          logo.data[(x + logo.width * y) * 4 + 1],
          logo.data[(x + logo.width * y) * 4 + 2], 0]).readInt32LE();
          logo.data[(x + logo.width * y) * 4 ] = (pixel & rmask) >> 16;
        logo.data[(x + logo.width * y) * 4 + 1] = (pixel & gmask) >> 8;
        logo.data[(x + logo.width * y) * 4 + 2] = (pixel & bmask) >> 0;
        logo.data[(x + logo.width * y) * 4 + 3] = 0x00;
      }
    }
    // draw the image to the window
    X.PutImage(2, win, gc, logo.width, logo.height, 0, 0, 0, 24, logo.data);
  }, 100);
  X.on('end', function() {
    clearInterval(loopInterval);
  });
  X.on('event', function (event) {
    if (event.type == 2) {
      keyDown(event.keycode);
    }
    if (event.type == 3) {
      keyUp(event.keycode);
    }
  });
}
