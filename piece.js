/* for piece logic. */
export default class Piece {
  x;
  y;
  color;
  shape;
  ctx;
  constructor(ctx) {
    this.ctx = ctx;
    this.spawn();
  }
  spawn() {
    this.color = 'blue';
    this.shape = [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0],
    ];

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
}
