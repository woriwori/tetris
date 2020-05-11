/* code to initialize the game and the overall game logic. */
import Board from './board.js';
import { BLOCK_SIZE, POINTS, KEY, LEVEL } from './constants';
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

initNext();

function initNext() {
  // Calculate size of canvas from constants.
  ctxNext.canvas.width = 4 * BLOCK_SIZE;
  ctxNext.canvas.height = 4 * BLOCK_SIZE;
  ctxNext.scale(BLOCK_SIZE / 2, BLOCK_SIZE / 2);
  // 샘플코드는 /2 를 안해도 잘 되는데 왜 나는 /2를 해야하는지 모르겠음.
}

function play() {
  resetGame();
  animate();
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
      gameOver();
      return;
    }
  }

  // Clear board before drawing new state.
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  board.draw();
  requestId = requestAnimationFrame(animate);
}

function gameOver() {
  cancelAnimationFrame(requestId);
  ctx.fillStyle = 'black';
  ctx.fillRect(1, 3, 8, 1.2);
  ctx.font = '1px Arial';
  ctx.fillStyle = 'red';
  ctx.fillText('GAME OVER', 1.8, 4);
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
