// snak: classic snake game

const canvas = document.querySelector('canvas');

const field = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var d = 'dU';

function getDir() {
  document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowUp"){
      snak.frame('dU');
    } else if (event.key == "ArrowRight"){
      snak.frame('dR');
    } else if (event.key == "ArrowDown"){
      snak.frame('dD');
    } else if (event.key == "ArrowLeft"){
      snak.frame('dL');
    } else alert('derp');
  });
}

class Snak {

  constructor() {
    this.position = {
      x: canvas.width/2,
      y: canvas.height/2
    }
    this.vel = {
      x: 0,
      y: 0
    }
    this.width = 10;
    this.height = 10;
  }
  draw() {
    field.fillStyle = 'yellow';
    field.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )

  }

  frame(d) {
    switch (d) {
      case 'dU': {this.position.y -= this.width; break;}
      case 'dD': {this.position.y += this.width; break;}
      case 'dL': {this.position.x -= this.height; break;}
      case 'dR': {this.position.x += this.height; break;}
    }
    this.draw();
  }

}

const snak = new Snak();

function step() {
  requestAnimationFrame(step);
  // field.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

  document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowUp"){
      d = 'dU';
    } else if (event.key == "ArrowRight"){
      d = 'dR';
    } else if (event.key == "ArrowDown"){
      d = 'dD';
    } else if (event.key == "ArrowLeft"){
      d = 'dL';
    } else snak.frame(d);
  });

  snak.frame(d);
}

step();
