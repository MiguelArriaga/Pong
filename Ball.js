


class Ball {
  constructor() {
    this.vel = [ballSpeed, 0];
    this.rotateVel(ballAngle);
    this.x = canvasSize / 2;
    this.y = canvasSize / 2;
    this.color = color(255);
  }

  colisionDepth(pos, dir, barrier) {
    return (pos - barrier) * dir + ballSize / 2;
  }

  canColide(pos, dir, barrier) {
    return (this.colisionDepth(pos, dir, barrier) >= 0);
  }

  reflect(dir, pos, vel, barrier) {
    pos = 2 * barrier - pos - ballSize * dir
    vel = -dir * abs(vel)
    return [pos, vel]
  }

  wallReflect(dir, barrier) {
    if (this.canColide(this.y, dir, barrier)) {
      let r = this.reflect(dir, this.y, this.vel[1], barrier)
      this.y = r[0]
      this.vel[1] = r[1]
    }
  }

  rotateVel(dAngle) {
    let c = cos(-dAngle)
    let s = sin(-dAngle)
    let vx = c * this.vel[0] - s * this.vel[1]
    let vy = s * this.vel[0] + c * this.vel[1]
    this.vel[0] = vx
    this.vel[1] = vy
  }

  paddleReflect(dir, padl) {
    var depth = this.colisionDepth(this.x, dir, padl.barrier)
    if (depth >= 0 && depth <= ballSize / 4) {
      if (padl.colided(this.y, ballSize)) {
        let r = this.reflect(dir, this.x, this.vel[0], padl.barrier)
        this.x = r[0]
        this.vel[0] = r[1]


        let dAngle = padl.getAngle(this.y, dir)
        this.rotateVel(dAngle)
        let pp = abs(this.vel[0]) / abs(this.vel[1])
        if (pp < 0.5) {
          let vxn = createVector(this.vel[0] * 0.5 / pp, this.vel[1])
          vxn.normalize()
          this.vel = [vxn.x * ballSpeed, vxn.y * ballSpeed]
        }

      }
    }
  }

  isGoal() {
    if (this.canColide(this.x, 1, canvasSize + ballSize)) {
      return "A"
    } else if (this.canColide(this.x, -1, -ballSize)) {
      return "B"
    } else {
      return "N"
    }
  }

  update(game) {
    this.x += this.vel[0];
    this.y += this.vel[1];

    this.wallReflect(-1, 0.0);
    this.wallReflect(1, canvasSize);

    this.paddleReflect(-1, game.paddleA);
    this.paddleReflect(1, game.paddleB);

    return this.isGoal()
  }

  draw() {
    fill(this.color);
    noStroke();
    stroke(0);
    strokeWeight(1)
    ellipseMode(CENTER);
    ellipse(this.x, this.y, ballSize);
  }


}