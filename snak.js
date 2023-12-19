const view = document.querySelector("canvas");
const grid = view.getContext("2d");
view.width = window.innerWidth;
view.height = window.innerHeight;
const wide = view.width >= view.height;
const res = 50;
const size = wide ? Math.floor(view.width / res) : Math.floor(view.height / res);
const cols = Math.floor(view.width / size-1);
const rows = Math.floor(view.height / size-1);
let head = [Math.floor(cols / 2), Math.floor(rows / 2)];
let tail = [];
let bearing = [1,0];
let snak;
let velo = 150;
let tile = new Array(cols).fill(null).map(() => new Array(rows).fill(null));

function drawBoard() {
    grid.fillStyle = "#1b1c18";
    grid.fillRect(0, 0, cols*size+size, rows*size+size);
    tile.forEach((_, x) => {
      tile[x][0] = 0;
      draw(x * size, 0, "#472e27");
      tile[x][rows] = 0;
      draw(x * size, rows * size, "#472e27");
    });
    tile[0].forEach((_, y) => {
      tile[0][y] = 0;
      draw(0, y * size, "#472e27");
    });
    tile[cols-1].forEach((_, y) => {
      tile[cols-1][y] = 0;
      draw(cols * size, y * size, "#472e27");
    });
    drawHead();
}

function draw(x, y, color) {
  // grid.shadowBlur = 5;
  // grid.shadowColor = color;
  grid.fillStyle = color;
  grid.fillRect(x, y, size, size);
  // grid.fillRect(x,y,size,size);
}

function drawHead() {
  draw(head[0] * size, head[1] * size, "#757a4b");
}

function advHead() {
  bearing[1] ? head[bearing[0]]++ : head[bearing[0]]--;
}

function remTail() {
  tail.push([...head]);
  tile[tail[0][0]][tail[0][1]] = null;
  draw(tail[0][0] * size, tail[0][1] * size, "#1b1c18");
  !snak ? tail.shift() : drawSnak();
}

function evalHead() {
  const h = tile[head[0]][head[1]];
  h === 0 ? location.reload()
    : h ? snak = true
  : snak = false;
  tile[head[0]][head[1]] = 0;
}

function drawSnak() {
  let x = Math.floor(Math.random()*(cols-2)+1);
  let y = Math.floor(Math.random()*(rows-2)+1);
  tile[x][y] = 1;
  draw(x * size, y * size, "#30823c");
  velo -= 5;
}

function turn() {
  console.log(head, bearing)
  let p = false;
document.addEventListener("keydown", (k) => {
    if (p = true) { 
      if (bearing[0]) {  
        switch (k.key) {
          case "ArrowRight": { bearing = [0,1]; p = false; break; }
          case "ArrowLeft": { bearing = [0,0]; p = false; break; }
        }
      } else {
        switch (k.key) {
          case "ArrowUp": { bearing = [1,0]; p = false; break; }
          case "ArrowDown": { bearing = [1,1]; p = false; break; }
        }
      }
    }
  });
  remTail();
  advHead();
  drawHead();
  evalHead();
  
  setTimeout(() => {
    requestAnimationFrame(turn);
  }, velo);
}

function startGame() {
  drawBoard();
  drawSnak();
  turn();
}

startGame();

