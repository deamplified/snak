const view = document.querySelector('canvas');
view.width = window.innerWidth; view.height = window.innerHeight;
const grid = view.getContext('2d');
const cols = 100; const rows = Math.floor(cols*(view.height/view.width));
const size = Math.floor(view.width/cols);
let axis = true;
let face = 'n';
let head = [Math.floor(cols/2), Math.floor(rows/2)];
let tail = [];
let tile = new Array(cols).fill(null).map(() => (new Array(rows).fill(null)));
tile[head[0]][head[1]] = 1;
function board(){
  grid.fillStyle = '#110';
  grid.fillRect(0, 0, view.width, view.height);
  tile.forEach((_, x) => {
    draw(x*size,0,'#665');
    tile[x][0] = 0;
    draw(x*size, rows*size,'#665');
    tile[x][rows] = 0;
  });
  tile[0].forEach((_, y) => {
    draw(0, y*size,'#665');
    tile[0][y] = 0;
  });
  tile[rows].forEach((_, y) => {
    draw(cols*size, y*size,'#665');
    tile[cols-1][y] = 0;
  });
}
function draw(x,y,color) {
  grid.fillStyle = color;
  grid.fillRect(x, y, size, size);
}
function drawHead() {
  tail.push(head);
  draw(head[0]*size, head[1]*size, '#990');
}
function advHead(){
  tile[head[0]][head[1]] = 0;
  switch (face) {
    case 'w': { head[0] -= 1; break; }
    case 'e': { head[0] += 1; break; }
    case 'n': { head[1] -= 1; break; }
    case 's': { head[1] += 1; break; }
  }
}
function remTail(){
  draw(tail[0][0]*size, tail[0][1]*size, '#110');
  tile[tail[0][0]][tail[0][1]] = null;
  tail.shift();
  console.log(`${tail}`)
  advHead();
}
function evalHead(h) {
  h !== 0 ?
    h > 0 ? 
      advHead()
      : remTail()
    : location.reload();
}
function start() {
  board();
  turn();
}
function turn() {
  document.addEventListener("keydown", function(dir) {
    if (axis)  {
      switch(dir.key) {
        case "ArrowLeft": { axis = false; face = 'w'; break; }
        case "ArrowRight": { axis = false; face = 'e'; break; }
        }
      } else {
      switch(dir.key) {
        case "ArrowUp": { axis = true; face = 'n'; break; }
        case "ArrowDown": { axis = true; face = 's'; break; }
        }
      }
    });
    evalHead(tile[head[0]][head[1]]);
    drawHead(tile[head[0]][head[1]]);
    setTimeout( () => {
    requestAnimationFrame(turn);
  }, 500);
}
start();
