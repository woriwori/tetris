/* for board logic. */
import Piece from './piece';
import { COLS, ROWS, BLOCK_SIZE, KEY, COLORS, POINTS } from './constants';
import { moves, account } from './main';
export default class Board {
  ctx;
  ctxNext;
  grid;
  piece;
  constructor(ctx, ctxNext) {
    this.ctx = ctx;
    this.ctxNext = ctxNext;
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
    this.piece = new Piece(this.ctx);
    this.piece.setStartingPosition();
    this.getNewPiece();
  }

  getNewPiece() {
    this.next = new Piece(this.ctxNext);
    this.ctxNext.clearRect(0, 0, this.ctxNext.canvas.width, this.ctxNext.canvas.height);
    this.next.draw();
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
        return value === 0 || (this.insideWalls(x) && this.aboveFloor(y) && this.notOccupied(x, y));
      });
    });
  }
  insideWalls(x) {
    return x >= 0 && x < COLS;
  }
  aboveFloor(y) {
    return y <= ROWS;
  }
  notOccupied(x, y) {
    return this.grid[y] && this.grid[y][x] === 0;
  }
  rotate(piece, direction) {
    // Clone with JSON for immutability.
    // spread 연산자로 하면 1 level 밖에 못하니까 아래처럼 함.
    let p = JSON.parse(JSON.stringify(piece));
    // Transpose matrix
    for (let y = 0; y < p.shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [p.shape[x][y], p.shape[y][x]] = [p.shape[y][x], p.shape[x][y]];
      }
    }
    p.shape.forEach((row) => row.reverse());

    return p;
  }

  draw() {
    this.piece.draw();
    this.drawBoard();
  }

  drawBoard() {
    this.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = COLORS[value];
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  drop() {
    let p = moves[KEY.DOWN](this.piece);
    if (this.valid(p)) {
      this.piece.move(p);
    } else {
      this.freeze();
      this.clearLines();
      if (this.piece.y === 0) {
        // Game over
        return false;
      }
      this.piece = this.next;
      this.piece.ctx = this.ctx;
      this.piece.setStartingPosition();
      this.getNewPiece();
    }
    return true;
  }
  freeze() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.grid[y + this.piece.y][x + this.piece.x] = value;
        }
      });
    });
  }
  clearLines() {
    let lines = 0;

    this.grid.forEach((row, y) => {
      // If every value is greater than 0.
      if (row.every((value) => value > 0)) {
        lines++;

        // Remove the row.
        this.grid.splice(y, 1);

        // Add zero filled row at the top.
        this.grid.unshift(Array(COLS).fill(0));
      }
    });

    if (lines > 0) {
      // Calculate points from cleared lines and level.
      account.score += this.getLinesClearedPoints(lines);
      // account.lines += lines;
      // // If we have reached the lines for next level
      // if (account.lines >= LINES_PER_LEVEL) {
      //   // Goto next level
      //   account.level++;
      //   // Remove lines so we start working for the next level
      //   account.lines -= LINES_PER_LEVEL;
      //   // Increase speed of game
      //   time.level = LEVEL[account.level];
      // }
    }
  }
  getLinesClearedPoints(lines, level) {
    const lineClearPoints = lines === 1 ? POINTS.SINGLE : lines === 2 ? POINTS.DOUBLE : lines === 3 ? POINTS.TRIPLE : lines === 4 ? POINTS.TETRIS : 0;

    return (account.level + 1) * lineClearPoints;
  }
}
