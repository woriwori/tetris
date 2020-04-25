/* where we put the configurations and rules of the game. */
export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 30;
export const KEY = {
  // 각 숫자는 keydown이벤트의 keycode 값
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  P: 80,
  Q: 81,
};
Object.freeze(KEY);
