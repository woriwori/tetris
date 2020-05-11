/* code to initialize the game and the overall game logic. */
import Board from './board.js';
import { POINTS, KEY, LEVEL } from './constants';
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d');

let board = new Board(ctx, ctxNext);
let requestId;
export let time;

let accountValues = {
  score: 0,
  level: 0,
  lines: 0,
};

function updateAccount(key, value) {
  let element = document.getElementById(key);
  if (element) {
    element.textContent = value;
  }
}

export let account = new Proxy(accountValues, {
  set: (target, key, value) => {
    target[key] = value;
    updateAccount(key, value);
    return true;
  },
});

function play() {
  resetGame();
  animate();
  // let piece = new Piece(ctx);
  // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // 이전 모양 지움
  // piece.draw(); // 화면에 shape(테트리스 블록 1개)을 그림
  // board.piece = piece;
  // console.log(piece); // piece는 shape(테트리스 블록 1개) 가 포함된 객체
}
window.play = play;

function resetGame() {
  account.score = 0;
  account.lines = 0;
  account.level = 0;
  board.reset();
  time = { start: 0, elapsed: 0, level: LEVEL[account.level] };
}

function animate(now = 0) {
  time.elapsed = now - time.start;
  if (time.elapsed > time.level) {
    time.start = now;
    if (!board.drop()) {
      // gameOver();
      return;
    }
  }

  // Clear board before drawing new state.
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  board.draw();
  requestId = requestAnimationFrame(animate);
}
export const moves = {
  // p : piece 클래스 인스턴스
  // p.x, p.y : block의 x,y축 좌표
  [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
  [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
  [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
  [KEY.SPACE]: (p) => ({ ...p, y: p.y + 1 }),
  [KEY.UP]: (p) => board.rotate(p),
};

document.addEventListener('keydown', (e) => {
  if (moves[e.keyCode]) {
    e.preventDefault(); // stop event bubbling
    let p = moves[e.keyCode](board.piece);
    if (e.keyCode === KEY.SPACE) {
      while (board.valid(p)) {
        // hard drop
        account.score += POINTS.HARD_DROP;
        board.piece.move(p);
        p = moves[KEY.DOWN](board.piece);
      }
    } else if (board.valid(p)) {
      // block 이동이 가능한 경우. (벽에 안부딪힘)
      board.piece.move(p);
      if (event.keyCode === KEY.DOWN) {
        account.score += POINTS.SOFT_DROP;
      }
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // 이전 모양 지움
    board.piece.draw();
  }
});
