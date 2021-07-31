


class Ball {
  constructor() {
    this.vel = [ballSpeed, 0];
    this.rotateVel(ballAngle);
    this.ballSize = ballSize;
    this.x = canvasSize / 2;
    this.y = canvasSize / 2;
    this.color = color(255);
  }

  canColide(pos, dir, barrier) {
    return pos * dir > barrier * dir - this.ballSize / 2;
  }

  reflect(dir, pos, vel, barrier) {
    pos = 2 * barrier - this.ballSize * dir - pos
    vel = -dir*abs(vel)
    return (pos, vel)
  }

  wallReflect(dir, barrier) {
    if (this.canColide(this.y, dir, barrier)) {
      this.y, this.vel[1] = this.reflect(dir, this.y, this.vel[1], barrier)
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
    if (this.canColide(this.x, dir, padl.barrier)) {
      if (padl.colided(this.y, this.ballSize)) {
        this.x, this.vel[0] = this.reflect(dir, this.x, this.vel[0], padl.barrier)
        let dAngle = padl.getAngle(this.y, dir)
        this.rotateVel(dAngle)
        let pp = abs(this.vel[0])/abs(this.vel[1])
        if (pp<0.5){
          let vxn = createVector(this.vel[0]*0.5/pp,this.vel[1])
          vxn.normalize()
          this.vel = [vxn.x*ballSpeed,vxn.y*ballSpeed]
        }

      }
    }
  }

  isGoal() {
    if (this.canColide(this.x, -1, 0)) {
      return -1
    } else if (this.canColide(this.x, 1, canvasSize)) {
      return 1
    } else {
      return 0
    }
  }

  update(game) {
    this.x += this.vel[0];
    this.y += this.vel[1];

    this.wallReflect(-1, 0.0);
    this.wallReflect(1, canvasSize);

    this.paddleReflect(-1, game.paddleA);
    this.paddleReflect(1, game.paddleB);

    if (this.canColide(this.x,1,canvasSize)) {
      return "A" // A wins a point
    } else if (this.canColide(this.x,-1,0)){
      return "B" // B wins a point
    } else {
      return "N"
    }
  }

  draw() {
    fill(this.color);
    noStroke();
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.ballSize);
  }


}