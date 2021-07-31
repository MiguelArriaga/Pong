


class Paddle {
  constructor(side,auto=false) {
    this.side = side;
    this.vel = paddleSpeed;
    this.dir = 0;
    this.auto = auto
    this.brain = new NeuralNetwork(2,7,1);
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
      (y + d > this.y - this.paddleLength / 2) &&
      (y - d < this.y + this.paddleLength / 2)
    )
  }

  getAngle(y, dir) {
    return dir * 45 * (y - this.y) / (this.paddleLength / 2)
  }

  update(ball_x_pos,ball_y_vel) {
    if (this.auto) {
      let input_values = [ball_x_pos/canvasSize,(ball_y_vel/ballSpeed+1)/2]
      this.dir = round(this.brain.predict(input_values))
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