/* code to initialize the game and the overall game logic. */
import { COLS, ROWS, BLOCK_SIZE } from './constants';
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// 상수로 canvas 사이즈 계산
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// // Scale blocks
// // scalle은 x,y축으로 N배만큼 확대함. (좌표/길이/선두께 포함)
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
