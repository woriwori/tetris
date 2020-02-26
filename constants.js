/* where we put the configurations and rules of the game. */
export const COLS = 10;
export const ROWS = 20;
export const BLOCK_SIZE = 30;
export const KEY = {
  // 각 숫자는 keydown이벤트의 keycode 값
  LEFT: 37,
  RIGHT: 39,
  DOWN: 40,
  SPACE: 32,
};
Object.freeze(KEY);
