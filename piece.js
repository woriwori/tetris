import { COLORS, SHAPES } from './constants';
/* for piece logic. */
export default class Piece {
  /* 
  x : grid에서의 x 좌표
  y : grid에서의 y 좌표
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

    // set starting position
    this.setStartingPosition();
    this.y = 0;
  }
  draw() {
    this.ctx.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        // x, y: shape 2차원 배열내에서 1의 값을 가진 원소의 인덱스
        // this.x, this.y : grid 내의 블록 위치
        if (value > 0) {
          // 원소 값이 1이면, 색을 채워서 블록 모양이 표시되도록함. (SHAPES 상수 참조)
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
