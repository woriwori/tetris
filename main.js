/* code to initialize the game and the overall game logic. */
import Board from './board.js';
import Piece from './piece';
import { COLS, ROWS, BLOCK_SIZE, KEY } from './constants';
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

let board = new Board(ctx);

function play() {
  board.reset();
  let piece = new Piece(ctx);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // 이전 모양 지움
  piece.draw(); // 화면에 shape(테트리스 블록 1개)을 그림
  board.piece = piece;
  console.log(piece); // piece는 shape(테트리스 블록 1개) 가 포함된 객체
}
window.play = play;

const moves = {
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
        board.piece.move(p);
        p = moves[KEY.DOWN](board.piece);
      }
    } else if (board.valid(p)) {
      // block 이동이 가능한 경우. (벽에 안부딪힘)
      board.piece.move(p);
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // 이전 모양 지움
    board.piece.draw();
  }
});
