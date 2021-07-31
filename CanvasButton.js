function getCircleBtn(text, clickFunction  ,x,y,w){
  let cb = new CanvasButton(text, clickFunction,x, y, w, w)
  cb.isCircle = true;
  return cb
}


class CanvasButton {

  constructor(txt, clickFunction, x = canvasSize / 2, y = canvasSize / 2, w = canvasSize / 5, h = canvasSize / 20) {

    // properties
    this.txt = txt;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.mode = CENTER;
    this.isCircle = false;
    this.ctext = color(0);
    this.crect = color(255);
    this.ctext_hover = this.crect;
    this.crect_hover = this.ctext;
    this.click = clickFunction;

    //state   
    this.isActive = true;
    this.isPressed = false;

  }

  updateProperties(x, y, w, h, ctext = null, crect = null, ctext_hover = null, crect_hover = null) {
    this.updatePosition(x, y);
    this.updateSize(w, h);
    this.updateColors(ctext, crect, ctext_hover, crect_hover);
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }
  updateSize(w, h) {
    this.w = w;
    this.h = h;
  }
  updateColors(ctext = null, crect = null, ctext_hover = null, crect_hover = null) {
    if (ctext !== null) this.ctext = ctext;
    if (crect !== null) this.crect = crect;
    if (ctext_hover !== null) this.ctext_hover = ctext_hover;
    if (crect_hover !== null) this.crect_hover = crect_hover;
    if (crect !== null && ctext_hover === null) this.ctext_hover = crect;
    if (ctext !== null && crect_hover === null) this.crect_hover = ctext;
  }

  contains(px, py) {
    if (this.isCircle) {
      if (Math.pow(2*(this.x-px)/this.w,2)+Math.pow(2*(this.y-py)/this.w,2)<=1){
        return true;
      }
    } else if (px > (this.x - this.w / 2) &&
      px < (this.x + this.w / 2) &&
      py > (this.y - this.h / 2) &&
      py < (this.y + this.h / 2)) {
      return true;
    } 
    return false;

  }

  possibleClickDown(px, py) {
    if (this.isActive && this.contains(px, py)) {
      this.isPressed = true;
    }
  }

  isClickUp(px, py) {
    if (!this.isPressed) {
      return false;
    } else {
      this.isPressed = false;
      return (this.isActive && this.contains(px, py))
    }
  }
  
  click() {
    throw "Error: Click function not implemented for button: " + this.txt;
  }

  draw(hoverx = null, hovery = null) {
    if (this.isActive) {
      let crect = this.crect;
      let ctext = this.ctext;

      if (hoverx !== null && hovery !== null) {
        if (this.contains(hoverx, hovery)) {
          crect = this.crect_hover;
          ctext = this.ctext_hover;
        }
      }

      fill(crect);
      stroke(ctext);
      strokeWeight(0.05 * min(this.w, this.h));
      if (this.isCircle) {
        ellipseMode(this.mode);
        ellipse(this.x, this.y, this.w);
      }else {
      rectMode(this.mode);
      rect(this.x, this.y, this.w, this.h);
      }
      fill(ctext);
      noStroke();
      textStyle(BOLD);
      textSize(this.h * 0.5);
      textAlign(CENTER, CENTER);
      text(this.txt, this.x, this.y);
    }
  }



}