/* for board logic. */
import Piece from './piece';
import { COLS, ROWS, BLOCK_SIZE, LINES_PER_LEVEL, KEY, COLORS, POINTS, LEVEL } from './constants';
import { moves, account, time } from './main';
export default class Board {
  ctx; // 게임 진행 중인 html dom의 canvas 렌더링 컨텍스트
  ctxNext; // 다음 블럭 보여줄 html dom의 canvas 렌더링 컨텍스트
  grid; // ROWS * COLS 의 2차원 배열
  piece; // 현재 블럭(piece)
  next; // 다음 블럭(piece)

  /* initialize */
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
    this.grid = this.getEmptyGrid();
    this.piece = new Piece(this.ctx);
    this.piece.setStartingPosition();
    this.getNewPiece();
  }

  getEmptyGrid() {
    // ROWS * COLS 의 2차원 배열 생성됨.
    // from 이 {length: N}을 넣으면, 길이가 N인 배열을 생성해주고,
    // callback의 return 값을 배열의 각 원소로 초기화해줌.
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  getNewPiece() {
    this.next = new Piece(this.ctxNext);
    this.ctxNext.clearRect(0, 0, this.ctxNext.canvas.width, this.ctxNext.canvas.height);
    this.next.draw();
  }

  /* true: 벽에 안부딪힘 / false: 벽에 부딪힘 */
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

  /* rotate */
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

  /* draw piece & grid */
  draw() {
    this.piece.draw(); // ctx 위에 현재 블록을 그림
    this.drawBoard(); // ctx 위에 현재 블록 전까지 쌓인 블록을 그림
  }
  drawBoard() {
    console.log('----board----');
    console.table(this.grid);
    console.log('----board----');
    this.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          // freeze() 함수를 통해 grid에 블록이 고정된 경우에만 이 조건실행문에 들어옴.
          this.ctx.fillStyle = COLORS[value];
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  /* 자동으로 떨어지는 동작용 함수 */
  /*  
    timer로 계속 떨어지도록 하고 있기 때문에,
    사용자가 방향키로 조작을 하더라도 계속 이 함수가 호출될 수 밖에 없음. 
    그래서 사용자가 빠르게 아래키를 눌러서 땅에 닿아도, 
    이 함수가 호출되기 전까지는 점수가 추가될 수 없음. (즉, 라인이 지워질 수 없음.)
   */
  drop() {
    let p = moves[KEY.DOWN](this.piece);
    if (this.valid(p)) {
      // 땅에 안부딪힘
      this.piece.move(p);
    } else {
      // 땅에 부딪힘
      this.freeze();
      this.clearLines();
      if (this.piece.y === 0) {
        // 블록이 젤 꼭대기에 닿았을 때
        // Game over
        return false;
      }
      this.piece = this.next; // 새 블록 추가
      this.piece.ctx = this.ctx; // 이전 블록이 추가된 grid가 그려진 ctx
      this.piece.setStartingPosition();
      this.getNewPiece(); // 다음에 나올 블록을 미리 세팅
    }
    return true;
  }
  freeze() {
    // 블록이 쌓인 경우, 쌓인 블록을 ctx에 고정으로 draw함.
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
      account.lines += lines;
      // If we have reached the lines for next level
      if (account.lines >= LINES_PER_LEVEL) {
        // Goto next level
        account.level++;
        // Remove lines so we start working for the next level
        account.lines -= LINES_PER_LEVEL;
        // Increase speed of game
        time.level = LEVEL[account.level];
      }
    }
  }
  getLinesClearedPoints(lines, level) {
    const lineClearPoints = lines === 1 ? POINTS.SINGLE : lines === 2 ? POINTS.DOUBLE : lines === 3 ? POINTS.TRIPLE : lines === 4 ? POINTS.TETRIS : 0;
    return (account.level + 1) * lineClearPoints;
  }
}
