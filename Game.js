
class Game {
  constructor(players = 1, AIType = "dumb") {
    this.players = players
    this.AIType = AIType

    this.playAgainBtn = new CanvasButton('Play Again');
    this.mvmtButtons = {};
    this.mvmtButtons["B_UP"] = new CanvasButton('/\\', null,
      canvasSize * 4 / 5, canvasSize - 3 * buttonHeight, buttonHeight, buttonHeight);
    this.mvmtButtons["B_DOWN"] = new CanvasButton('\\/', null,
      canvasSize * 4 / 5, canvasSize - buttonHeight, buttonHeight, buttonHeight);

    this.resetGame();
  }

  resetGame() {
    this.isLive = true;
    this.playAgainBtn.isActive = false;
    this.paddleA = new Paddle("left", this.players < 2, this.AIType);
    this.paddleB = new Paddle("right", this.players < 1, this.AIType);
    this.nextPoint(0);
  }

  nextPoint(x) {
    if (x === "A") {
      this.paddleA.score += 1;
    } else if (x === "B") {
      this.paddleB.score += 1;
    }
    this.paddleA.y = canvasSize / 2;
    this.paddleB.y = canvasSize / 2;
    this.ball = new Ball();
  }

  winner() {
    if (this.paddleA.score >= winPoints) {
      return "A"
    } else if (this.paddleB.score >= winPoints) {
      return "B"
    } else {
      return "N"
    }
  }

  update() {
    if (keyIsDown(UP_ARROW) || this.mvmtButtons["B_UP"].isPressed) {
      this.paddleB.dir = -1
    } else if (keyIsDown(DOWN_ARROW) || this.mvmtButtons["B_DOWN"].isPressed) {
      this.paddleB.dir = 1
    } else {
      this.paddleB.dir = 0
    }

    this.paddleA.update(this.ball)
    this.paddleB.update(this.ball)
    var point = this.ball.update(this)
    if (point !== "N") {
      this.nextPoint(point)
    }

    if (this.winner() !== "N") {
      this.isLive = false;
      this.playAgainBtn.isActive = true;
      console.log(this.winner())
    }

  }

  draw() {

    for (var btnk in game.mvmtButtons) {
      game.mvmtButtons[btnk].draw(mouseX, mouseY);
    }
    this.drawPoints()
    this.paddleA.draw()
    this.paddleB.draw()
    this.ball.draw()
    this.playAgainBtn.draw(mouseX, mouseY);
    this.drawGameOver()
  }

  drawPoints() {
    textSize(canvasSize / 20);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    text(str(this.paddleA.score), buttonHeight, buttonHeight);
    text(str(this.paddleB.score), canvasSize - buttonHeight, buttonHeight);
  }

  drawGameOver() {
    if (!this.isLive) {
      textSize(canvasSize / 20);
      fill(255);
      noStroke();
      textAlign(CENTER, CENTER);
      text("GAME OVER", canvasSize / 2, canvasSize / 5);
    }
  }



  keyPressed() {
    if (keyCode === ENTER && !this.isLive) {
      this.resetGame()
    }
  }

  mousePressed() {
    if (mouseButton === LEFT || touches.length == 1) {
      this.playAgainBtn.possibleClickDown(mouseX, mouseY)

      for (var btnk in this.mvmtButtons) {
        this.mvmtButtons[btnk].possibleClickDown(mouseX, mouseY);
      }
      console.log("mousePressed")
    }
  }


  mouseReleased() {
    if (mouseButton === LEFT || touches.length == 0) {
      if (this.playAgainBtn.isClickUp(mouseX, mouseY)) {
        this.resetGame();
      }

      for (var btnk in this.mvmtButtons) {
        this.mvmtButtons[btnk].isPressed = false;
      }
    }
  }
}