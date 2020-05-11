import { COLORS, SHAPES } from './constants';
/* for piece logic. */
export default class Piece {
  /* 
  x : board에서의 x 좌표
  y : board에서의 y 좌표
  color : block 색
  shape : block 을 행렬로 표현한 2차원 배열
  ctx : canvas 객체
  */
  x;
  y;
  color;
  shape;
  ctx;
  typeId;
  constructor(ctx) {
    this.ctx = ctx;
    this.spawn();
  }
  spawn() {
    this.typeId = this.randomizeTetrominoType(COLORS.length - 1);
    this.shape = SHAPES[this.typeId];
    this.color = COLORS[this.typeId];
    // starting position
    this.x = 3;
    this.y = 0;
  }
  draw() {
    this.ctx.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        // x, y 는 shape 내에서 블록의 위치
        // this.x + x 는 보드상 블록 위치
        if (value > 0) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }
  move(p) {
    this.x = p.x;
    this.y = p.y;
    this.shape = p.shape;
  }
  randomizeTetrominoType(noOfTypes) {
    return Math.floor(Math.random() * noOfTypes + 1);
  }
  setStartingPosition() {
    this.x = this.typeId === 4 ? 4 : 3;
  }
}
