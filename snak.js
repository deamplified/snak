// snak: classic snake game

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const grid = canvas.getContext('2d');
const numCols = 100;
const numRows = Math.floor(numCols*(canvas.height/canvas.width));
const tileSize = Math.floor(canvas.width/numCols);
let tile = new Array(numCols).fill((new Array(numRows).fill(null)));

function draw(x,y,color) {
  grid.fillStyle = color;
  grid.fillRect(x, y, tileSize, tileSize);
}

function drawBoard() {
  [...Array(numCols)].forEach((_, i) => {
    [...Array(numRows)].forEach((_, p) => {
      draw(i*tileSize,p*tileSize,'gray');
    })
  });
}

function drawWalls(){
  tile.forEach((_, i) => {
    draw(i*tileSize,0,'red');
    tile[i][0] = 0;

    draw(i*tileSize, numRows*tileSize-tileSize,'purple');
    tile[i][numRows] = 0;
  });

  tile[0].forEach((_, i) => {
    draw(0, i*tileSize-tileSize,'blue');
    //tile[0][i] = 0;

    draw(numCols*tileSize, i*tileSize-tileSize,'green');
    //tile[numCols][i] = 0;
  });
}

drawBoard();
drawWalls();
