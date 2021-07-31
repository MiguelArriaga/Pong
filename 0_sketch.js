
// Globals are in globals.js
let game = null;

// SETUP
function setup() {
  angleMode(DEGREES);
  canvasSize = floor(min(windowWidth, windowHeight));
  paddleLength = canvasSize / 5;
  paddleWidth = canvasSize / 50;
  ballSize = canvasSize / 25;
  buttonHeight = canvasSize / 10;
  ballSpeed = canvasSize / 100;
  // ballSpeed = canvasSize/350;
  paddleSpeed = ballSpeed * 1.5;
  createCanvas(canvasSize, canvasSize);
  game = new Game(1)
}


function draw() {
  background(0)
  frameRate(60)

  if (game.isLive) {
    game.update()
  }
  game.draw()
}


function touchStarted() {
  mousePressed();
  return false;
}

function touchEnded() {
  mouseReleased();
  return false;
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

