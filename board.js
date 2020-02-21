/* for board logic. */
import { COLS, ROWS } from './constants';
export default class Board {
  grid;
  reset() {
    // 게임 시작전 보드 초기화
    this.grid = this.getEmptyBoard();
  }
  getEmptyBoard() {
    // ROWS * COLS 의 2차원 배열 생성됨.
    // from 이 {length: N}을 넣으면, 길이가 N인 배열을 생성해주고,
    // callback의 return 값을 배열의 각 원소로 초기화해줌.
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }
}
