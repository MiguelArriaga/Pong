
class Game {
  constructor(players = 1, AIType = "dumb") {
    this.players = players
    this.AIType = AIType

    this.playAgainBtn = new CanvasButton('Play Again');
    this.playerBtn = new CanvasButton('1 Player', null, canvasSize / 2, buttonHeight * 0.5, buttonHeight * 2, buttonHeight / 2);
    this.mvmtButtons = {};
    this.mvmtButtons["A_UP"] = getCircleBtn('/\\', null, buttonHeight, canvasSize - 2.2 * buttonHeight, buttonHeight);
    this.mvmtButtons["A_DOWN"] = getCircleBtn('\\/', null, buttonHeight, canvasSize - buttonHeight, buttonHeight);
    this.mvmtButtons["B_UP"] = getCircleBtn('/\\', null, canvasSize - buttonHeight, canvasSize - 2.2 * buttonHeight, buttonHeight);
    this.mvmtButtons["B_DOWN"] = getCircleBtn('\\/', null, canvasSize - buttonHeight, canvasSize - buttonHeight, buttonHeight);

    this.resetGame();
  }

  resetGame() {
    this.isLive = true;
    this.playAgainBtn.isActive = false;
    this.paddleA = new Paddle("left", this.players < 2, this.AIType);
    this.paddleB = new Paddle("right", this.players < 1, this.AIType);
    for (var btnk in this.mvmtButtons) {
      this.mvmtButtons[btnk].isActive = false;
    }
    if (this.players > 0) {
      this.mvmtButtons["B_UP"].isActive = true;
      this.mvmtButtons["B_DOWN"].isActive = true;
      if (this.players > 1) {
        this.mvmtButtons["A_UP"].isActive = true;
        this.mvmtButtons["A_DOWN"].isActive = true;
      }
    }
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
    if (keyIsDown(87) || this.mvmtButtons["A_UP"].isPressed) {
      this.paddleA.dir = -1
    } else if (keyIsDown(83) || this.mvmtButtons["A_DOWN"].isPressed) {
      this.paddleA.dir = 1
    } else {
      this.paddleA.dir = 0
    }
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
    this.playerBtn.draw(mouseX, mouseY);
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

  singlePress(x, y) {
    this.playAgainBtn.possibleClickDown(x, y)
    this.playerBtn.possibleClickDown(x, y)

    for (var btnk in this.mvmtButtons) {
      this.mvmtButtons[btnk].possibleClickDown(x, y);
    }
  }

  mousePressed() {
    if (mouseButton === LEFT || touches.length == 1) {
      this.singlePress(mouseX, mouseY)
    } else if (touches.length > 1) {
      for (var tch of touches) {
        this.singlePress(tch.x, tch.y);
      }
    }
  }


  mouseReleased() {
    if (mouseButton === LEFT || touches.length == 0) {
      if (this.playAgainBtn.isClickUp(mouseX, mouseY)) {
        this.resetGame();
      }
      if (this.playerBtn.isClickUp(mouseX, mouseY)) {
        this.players = 3 - this.players
        this.playerBtn.txt = str(this.players) + " Player"
        this.resetGame();
      }

      for (var btnk in this.mvmtButtons) {
        this.mvmtButtons[btnk].isPressed = false;
      }
    }
  }
}