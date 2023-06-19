// snak: classic snake game

const canvas = document.querySelector('canvas');
const field = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Snak {

  constructor() {
      this.pos = {
        x: canvas.width/2,
        y: canvas.height/2
      }
      this.vel = {
        x: 0,
        y: 0
      }
      this.width = 10;
      this.height = 10;
      this.perp = true;
    }

    draw() {
      field.fillStyle = 'yellow';
      field.fillRect(
        this.pos.x,
        this.pos.y,
        this.width,
        this.height
      )
    }

    frame() {
      advHead();
      this.draw();
  }
}

const snak = new Snak();

function advHead() {
  switch(snak.orig) {
    case 'N': snak.pos.y -= snak.height;
    case 'E': snak.pos.x += snak.height
    case 'S': snak.pos.y += snak.height
    case 'W': snak.pos.x -= snak.height
  }

}

function step() {
  requestAnimationFrame(step);
  snak.frame();
  console.log(snak.ori);

  // document.addEventListener("keydown", function(event) {
  //   if (snak.orig === 'E' || snak.orig === 'W') {
  //     switch(event.key) {
  //       case "ArrowUp": { snak.ori = 'N'; break;}
  //       case "ArrowDown": { snak.ori = 'S'; break;}
  //     }
  //   } else if (snak.orig === 'N' || snak.orig === 'S') {
  //     switch(event.key) {
  //       case "ArrowLeft": { snak.ori = 'W'; break;}
  //       case "ArrowRight": { snak.ori = 'E'; break;}
  //     }
  //   }
  // });

}

step();
