/* for board logic. */
import { COLS, ROWS, BLOCK_SIZE, KEY } from './constants';
export default class Board {
  ctx;
  grid;
  piece;
  constructor(ctx) {
    this.ctx = ctx;
    this.init();
  }
  init() {
    // 상수를 사용하여 캔버스 사이즈를 계산한다.
    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;

    // scale은 x,y축으로 N배만큼 확대함. (좌표/길이/선두께 포함)
    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  }
  reset() {
    // 게임 시작전 보드 초기화
    // return this.getEmptyBoard();
    this.grid = this.getEmptyGrid();
  }
  getEmptyGrid() {
    // ROWS * COLS 의 2차원 배열 생성됨.
    // from 이 {length: N}을 넣으면, 길이가 N인 배열을 생성해주고,
    // callback의 return 값을 배열의 각 원소로 초기화해줌.
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }
  valid(p) {
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = p.x + dx;
        let y = p.y + dy;
        return value === 0 || (this.insideWalls(x) && this.aboveFloor(y));
      });
    });
  }
  insideWalls(x) {
    return x >= 0 && x < COLS;
  }
  aboveFloor(y) {
    return y <= ROWS;
  }
}
