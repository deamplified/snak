
const canvas = document.querySelector('canvas');
canvas.width = (window.innerWidth);
canvas.height = window.innerHeight;
const grid = canvas.getContext('2d');
const numCols = 100;
const numRows = Math.floor(numCols*(canvas.height/canvas.width));
const tileSize = Math.floor(canvas.width/numCols); //in px
let axis = true;
let face = 'n';
let head = [Math.floor(numCols/2), Math.floor(numRows/2)]

let tile = new Array(numCols).fill(null).map(() => (new Array(numRows).fill(null)));

function drawtile(x,y,color) {
  grid.fillStyle = color;
  grid.fillRect(x, y, tileSize, tileSize);
}

function initBoard() {
  [...Array(numCols)].forEach((_, x) => {
    [...Array(numRows)].forEach((_, y) => {
      drawtile(x*tileSize,y*tileSize,'black');
    })
  });
}

function initWalls(){
  tile.forEach((_, x) => {
    drawtile(x*tileSize,0,'gray');
    tile[x][0] = 0;
    drawtile(x*tileSize, numRows*tileSize,'gray');
    tile[x][numRows] = 0;
  });
  tile[0].forEach((_, y) => {
    drawtile(0, y*tileSize,'gray');
    tile[0][y] = 0;
  });
  tile[numRows].forEach((_, y) => {
    drawtile(numCols*tileSize, y*tileSize,'gray');
    tile[numCols-1][y] = 0;
  });
}

function setHead() {
  tile[head[0]][head[0]] = 0; // set first tile to solid
  drawtile(head[0]*tileSize, head[1]*tileSize, 'yellow'); // draw first tile
}

function startGame() {
  initBoard();
  initWalls();
  setHead();
  turn();
}

function evalHead() {
  console.log(tile[head[0]][head[1]]);
  // if null, all good
  // if 0, game over
  //if 1, skip tail clear
}

function turn() {
  document.addEventListener("keydown", function(dir) {
    if (axis)  {
      switch(dir.key) {
        case "ArrowLeft": { axis = false; face = 'w'; break;}
        case "ArrowRight": { axis = false; face = 'e'; break;}
      }
    } else {
      switch(dir.key) {
        case "ArrowUp": { axis = true; face = 'n'; break;}
        case "ArrowDown": { axis = true; face = 's'; break;}
      }
    }
  });

  switch(face) {
    case 'w': { head[0] -= 1; break; }
    case 'e': { head[0] += 1; break; }
    case 'n': { head[1] -= 1; break; }
    case 's': { head[1] += 1; break; }
  }

  evalHead();
  drawtile(head[0]*tileSize, head[1]*tileSize, 'yellow');

  setTimeout( () => {
    requestAnimationFrame(turn);
  }, 48);
}

startGame();
