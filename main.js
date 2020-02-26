/* code to initialize the game and the overall game logic. */
import Board from './board.js';
import Piece from './piece';
import { COLS, ROWS, BLOCK_SIZE, KEY } from './constants';
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// 상수로 canvas 사이즈 계산
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// // Scale blocks
// // scalle은 x,y축으로 N배만큼 확대함. (좌표/길이/선두께 포함)
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

let board = new Board();
function play() {
  board = board.reset();
  let piece = new Piece(ctx);
  piece.draw();
  board.piece = piece;
  console.log(piece);
}
window.play = play;

const moves = {
  // p = piece, block 의 현재 position
  [KEY.LEFT]: p => ({ ...p, x: p.x - 1 }),
  [KEY.RIGHT]: p => ({ ...p, x: p.x + 1 }),
  [KEY.DOWN]: p => ({ ...p, y: p.y + 1 }),
  [KEY.SPACE]: p => ({ ...p, y: p.y + 1 }),
};
document.addEventListener('keydown', e => {
  if (moves[e.keyCode]) {
    e.preventDefault(); // stop event bubbling
    let p = moves[e.keyCode](board.piece);
    if (e.keyCode === KEY.SPACE) {
      while (board.valid(p)) {
        board.piece.move(p);
        p = moves[KEY.DOWN](board.piece);
      }
    } else if (board.valid(p)) {
      // block 이동이 가능한 경우. (벽에 안부딪힘)
      board.piece.move(p);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // 이전 모양 지움
      board.piece.draw();
    }
  }
});
