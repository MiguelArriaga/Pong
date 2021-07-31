
// Globals are in globals.js
let game = null;

// SETUP
function setup() {
  angleMode(DEGREES);
  canvasSize = floor(min(windowWidth, windowHeight));
  createCanvas(canvasSize, canvasSize);
  game = new Game(1)
}


function draw() {
  background(0)

  if (game.isLive) {
    game.update()
  }
  game.draw()
}



function keyPressed() {
  game.keyPressed()
  return false; // prevent any default behaviour
}

// Mouse-press Function
function mousePressed() {
  game.mousePressed()
  return false;
}

function mouseReleased() {
  game.mouseReleased()
  return false;
}

