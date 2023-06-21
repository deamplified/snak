// snak: classic snake game :P
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const grid = canvas.getContext('2d');

// derive a grid 100 units wide by however many square units fit vertically
const numCols = 100;
const numRows = Math.floor(numCols*(canvas.height/canvas.width));
const tileSize = Math.floor(canvas.width/numCols); //in px

// 2d state index[x][y] === xy coords of tile
//let tile = new Array(numCols);
let tile = new Array(numCols).fill(null).map(() => (new Array(numRows).fill(null)));

// draw/redraw tile
function draw(x,y,color) {
  grid.fillStyle = color;
  grid.fillRect(x, y, tileSize, tileSize);
}

// 100 x _ tiles  (draw clean grid)
function drawBoard() {
  [...Array(numCols)].forEach((_, x) => {
    [...Array(numRows)].forEach((_, y) => {
      draw(x*tileSize,y*tileSize,'gray');
    })
  });
}

// all edge tiles from null to '0' (walls turn solid)
function drawWalls(){

  // top and bottom walls
  tile.forEach((_, x) => {
    draw(x*tileSize,0,'red');
    console.log(" red tiles")
    tile[x][0] = 0; // works

    draw(x*tileSize, numRows*tileSize,'purple');
    tile[x][numRows] = 0; // works
  });

  // left wall
  tile[0].forEach((_, y) => {
    draw(0, y*tileSize,'blue');
    tile[0][y] = 0;     // does not work
  });

  // right wall
  tile[numRows].forEach((_, y) => {
    draw(numCols*tileSize, y*tileSize,'green');
    tile[numCols-1][y] = 0;  // also does not work
  });
}

drawBoard();
drawWalls();
