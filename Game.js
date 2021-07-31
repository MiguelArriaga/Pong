
class Game {
  constructor() {
    this.gameLive = true;
    this.playAgainBtn = new CanvasButton('Play Again', this.resetGame);
    this.mvmtButtons["A_UP"] = new CanvasButton('/\\', null, canvasSize/5, canvasSize - 90, 30, 30);
    this.mvmtButtons["A_DOWN"] = new CanvasButton('\\/', null, canvasSize/5, canvasSize - 40, 30, 30);
    this.resetGame();
  }


  resetGame() {
    this.gameLive = true;
    this.nextPoint(0);
    this.playAgainBtn.isActive = false;
    this.paddleA = new Paddle("left",auto=false);
    this.paddleB = new Paddle("right",auto=true);
  }

  nextPoint(x) {
    if (x === 1) {
        this.paddleA.score += 1;
    } else if (x === -1) {
        this.paddleB.score += 1;
    }
    this.ball = new Ball();
  }


  drawPoints() {
    textSize(32);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text(str(this.paddleA.score), 30, 35);
    text(str(this.paddleB.score), canvasSize - 30, 35);
  }
  
  drawGameOver(isLive) {
    if (!this.gameLive) {
      textSize(32);
      fill(255);
      noStroke();
      textAlign(CENTER, CENTER);
      text("GAME OVER", canvasSize / 2, canvasSize / 5);
    }
  }



}