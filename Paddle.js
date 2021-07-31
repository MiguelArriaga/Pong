


class Paddle {
  constructor(side, auto = false, AIType = "dumb") {

    this.side = side;
    this.auto = auto;
    this.AIType = AIType;

    this.vel = paddleSpeed;
    this.dir = 0;
    this.brain = new NeuralNetwork(2, 7, 1);
    this.score = 0;

    this.paddleLength = paddleLength;
    this.paddleWidth = paddleWidth;

    if (side == "left") {
      this.x = this.paddleWidth + this.paddleWidth / 2;
      this.barrier = this.x + this.paddleWidth / 2;
    } else {
      this.x = canvasSize - this.paddleWidth * 3 / 2;
      this.barrier = this.x - this.paddleWidth / 2;
    }
    this.y = canvasSize / 2;
    this.color = color(255);
  }

  colided(y, d) {
    return ( // Using d is not a bug. With d/2 has issues in corner cases.
      (y + d/2 > this.y - this.paddleLength / 2) &&
      (y - d/2 < this.y + this.paddleLength / 2)
    )
  }

  getAngle(y, dir) {
    return dir * 20 * (y - this.y) / (this.paddleLength / 2)
  }

  update(ball) {
    if (this.auto) {

      if (this.AIType === "dumb") {
        let pos_diff = this.y - ball.y;
        let direction = -Math.sign(pos_diff);
        this.dir = direction * Math.min(Math.pow(abs(pos_diff) / canvasSize, 0.5), 1);

      } else { //NN

        let input_values = [ball.x / canvasSize, (ball.vel[1] / ballSpeed + 1) / 2]
        this.dir = round(this.brain.predict(input_values))
      }
    }
    this.y += this.vel * this.dir

    if (this.y < this.paddleLength / 2) {
      this.y = this.paddleLength / 2;
    } else if (this.y > canvasSize - this.paddleLength / 2) {
      this.y = canvasSize - this.paddleLength / 2;
    }

  }


  draw() {
    fill(this.color);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.paddleWidth, this.paddleLength);
  }


}