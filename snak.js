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
let velo = 200;
let tile = new Array(cols).fill(null).map(() => new Array(rows).fill(null));

function drawBoard() {
    grid.fillStyle = "#111";
    grid.fillRect(0, 0, cols*size+size, rows*size+size);
    tile.forEach((_, x) => {
      tile[x][0] = 0;
      draw(x * size, 0, "#222");
      tile[x][rows] = 0;
      draw(x * size, rows * size, "#222");
    });
    tile[0].forEach((_, y) => {
      tile[0][y] = 0;
      draw(0, y * size, "#222");
    });
    tile[cols-1].forEach((_, y) => {
      tile[cols-1][y] = 0;
      draw(cols * size, y * size, "#222");
    });
    drawHead();
}

function draw(x, y, color) {
  grid.fillStyle = color;
  grid.fillRect(x, y, size, size);
}

function drawHead() {
  draw(head[0] * size, head[1] * size, "#070");
}

function advHead() {
  bearing[1] ? head[bearing[0]]++ : head[bearing[0]]--;
}

function remTail() {
  tail.push([...head]);
  tile[tail[0][0]][tail[0][1]] = null;
  draw(tail[0][0] * size, tail[0][1] * size, "#111");
  !snak ? tail.shift() : drawSnak();
}

function evalHead() {
  h = tile[head[0]][head[1]];
  h=== 0 ? location.reload()
    : h ? snak = true
  : snak = false;
  h = 0;
}

function drawSnak() {
  let x = Math.floor(Math.random()*(cols-2)+1);
  let y = Math.floor(Math.random()*(rows-2)+1);
  tile[x][y] = 1;
  draw(x * size, y * size, "#500");
  velo -= 10;
}

function turn() {
  document.addEventListener("keydown", (k) => {
    if (bearing[0]) {  
      switch (k.key) {
        case "ArrowRight": { bearing = [0,1]; break; }
        case "ArrowLeft": { bearing = [0,0]; break; }
      }
    } else {
      switch (k.key) {
        case "ArrowUp": { bearing = [1,0]; break; }
        case "ArrowDown": { bearing = [1,1]; break; }
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

