
// Globals are in globals.js

let paddleA = null;
let paddleB = null;
let playAgainBtn = null;
let gameLive = true;
let mvmtButtons = {};

// SETUP
function setup() {
  angleMode(DEGREES);
  canvasSize = floor(min(windowWidth, windowHeight));
  createCanvas(canvasSize, canvasSize);
  playAgainBtn = new CanvasButton('Play Again', resetGame);
  mvmtButtons["A_UP"] = new CanvasButton('/\\', null, canvasSize/5, canvasSize - 90, 30, 30);
  mvmtButtons["A_DOWN"] = new CanvasButton('\\/', null, canvasSize/5, canvasSize - 40, 30, 30);
  resetGame();

}

// RESET GAME
function resetGame() {
  gameLive = true;
  nextPoint(0);
  playAgainBtn.isActive = false;
  paddleA = new Paddle("left",auto=false);
  paddleB = new Paddle("right",auto=true);
}

// NEXT POINT
function nextPoint(x) {
  if (x === 1) {
    paddleA.score += 1;
  } else if (x === -1) {
    paddleB.score += 1;
  }
  ball = new Ball();
}

function drawPoints() {
  textSize(32);
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  text(str(paddleA.score), 30, 35);
  text(str(paddleB.score), canvasSize - 30, 35);
}
function drawGameOver(isLive) {
  if (!gameLive) {
    textSize(32);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text("GAME OVER", canvasSize / 2, canvasSize / 5);
  }
}


function draw() {
  background(0)

  if (gameLive) {
    if (keyIsDown(UP_ARROW) || mvmtButtons["A_UP"].isPressed) {
      paddleA.dir = -1
    } else if (keyIsDown(DOWN_ARROW) || mvmtButtons["A_DOWN"].isPressed) {
      paddleA.dir = 1
    } else {
      paddleA.dir = 0
    }

    paddleA.update(ball.x,ball.vel[1])
    // paddleB.y = ball.y
    paddleB.update(ball.x,ball.vel[1])
    var point = ball.update()
    if (point != 0) {
      nextPoint(point)
    }

    if (paddleA.score >= winPoints || paddleB.score >= winPoints) {
      gameLive = false;
      playAgainBtn.isActive = true;
    }
  }
  for (var btnk in mvmtButtons) {
    mvmtButtons[btnk].draw(mouseX, mouseY);
  }
  drawPoints()
  paddleA.draw()
  paddleB.draw()
  ball.draw()
  playAgainBtn.draw(mouseX, mouseY);
  drawGameOver(gameLive)
}



function keyPressed() {
  if (keyCode === ENTER && !gameLive) {
    resetGame()
  }
  return false; // prevent any default behaviour
}

// Mouse-press Function
function mousePressed() {
  if (mouseButton === LEFT || touches.length == 1) {
    playAgainBtn.possibleClickDown(mouseX, mouseY)

    for (var btnk in mvmtButtons) {
      mvmtButtons[btnk].possibleClickDown(mouseX, mouseY);
    }
  }
  return false;
}

function mouseReleased() {
  if (mouseButton === LEFT || touches.length == 0) {
    if (playAgainBtn.isClickUp(mouseX, mouseY)) {
      playAgainBtn.click();
    }

    for (var btnk in mvmtButtons) {
      mvmtButtons[btnk].isPressed = false;
    }
    return false;
  }
}
