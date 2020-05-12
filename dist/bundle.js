/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./board.js":
/*!******************!*\
  !*** ./board.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Board; });
/* harmony import */ var _piece__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./piece */ "./piece.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./constants.js");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main */ "./main.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* for board logic. */




var Board = /*#__PURE__*/function () {
  // 게임 진행 중인 html dom의 canvas 렌더링 컨텍스트
  // 다음 블럭 보여줄 html dom의 canvas 렌더링 컨텍스트
  // ROWS * COLS 의 2차원 배열
  // 현재 블럭(piece)
  // 다음 블럭(piece)

  /* initialize */
  function Board(ctx, ctxNext) {
    _classCallCheck(this, Board);

    _defineProperty(this, "ctx", void 0);

    _defineProperty(this, "ctxNext", void 0);

    _defineProperty(this, "grid", void 0);

    _defineProperty(this, "piece", void 0);

    _defineProperty(this, "next", void 0);

    this.ctx = ctx;
    this.ctxNext = ctxNext;
    this.init();
  }

  _createClass(Board, [{
    key: "init",
    value: function init() {
      // 상수를 사용하여 캔버스 사이즈를 계산한다.
      this.ctx.canvas.width = _constants__WEBPACK_IMPORTED_MODULE_1__["COLS"] * _constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_SIZE"];
      this.ctx.canvas.height = _constants__WEBPACK_IMPORTED_MODULE_1__["ROWS"] * _constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_SIZE"]; // scale은 x,y축으로 N배만큼 확대함. (좌표/길이/선두께 포함)

      this.ctx.scale(_constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_SIZE"], _constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_SIZE"]);
    }
  }, {
    key: "reset",
    value: function reset() {
      // 게임 시작전 보드 초기화
      this.grid = this.getEmptyGrid();
      this.piece = new _piece__WEBPACK_IMPORTED_MODULE_0__["default"](this.ctx);
      this.piece.setStartingPosition();
      this.getNewPiece();
    }
  }, {
    key: "getEmptyGrid",
    value: function getEmptyGrid() {
      // ROWS * COLS 의 2차원 배열 생성됨.
      // from 이 {length: N}을 넣으면, 길이가 N인 배열을 생성해주고,
      // callback의 return 값을 배열의 각 원소로 초기화해줌.
      return Array.from({
        length: _constants__WEBPACK_IMPORTED_MODULE_1__["ROWS"]
      }, function () {
        return Array(_constants__WEBPACK_IMPORTED_MODULE_1__["COLS"]).fill(0);
      });
    }
  }, {
    key: "getNewPiece",
    value: function getNewPiece() {
      this.next = new _piece__WEBPACK_IMPORTED_MODULE_0__["default"](this.ctxNext);
      this.ctxNext.clearRect(0, 0, this.ctxNext.canvas.width, this.ctxNext.canvas.height);
      this.next.draw();
    }
    /* true: 벽에 안부딪힘 / false: 벽에 부딪힘 */

  }, {
    key: "valid",
    value: function valid(p) {
      var _this = this;

      return p.shape.every(function (row, dy) {
        return row.every(function (value, dx) {
          var x = p.x + dx;
          var y = p.y + dy;
          return value === 0 || _this.insideWalls(x) && _this.aboveFloor(y) && _this.notOccupied(x, y);
        });
      });
    }
  }, {
    key: "insideWalls",
    value: function insideWalls(x) {
      return x >= 0 && x < _constants__WEBPACK_IMPORTED_MODULE_1__["COLS"];
    }
  }, {
    key: "aboveFloor",
    value: function aboveFloor(y) {
      return y <= _constants__WEBPACK_IMPORTED_MODULE_1__["ROWS"];
    }
  }, {
    key: "notOccupied",
    value: function notOccupied(x, y) {
      return this.grid[y] && this.grid[y][x] === 0;
    }
    /* rotate */

  }, {
    key: "rotate",
    value: function rotate(piece, direction) {
      // Clone with JSON for immutability.
      // spread 연산자로 하면 1 level 밖에 못하니까 아래처럼 함.
      var p = JSON.parse(JSON.stringify(piece)); // Transpose matrix

      for (var y = 0; y < p.shape.length; ++y) {
        for (var x = 0; x < y; ++x) {
          var _ref = [p.shape[y][x], p.shape[x][y]];
          p.shape[x][y] = _ref[0];
          p.shape[y][x] = _ref[1];
        }
      }

      p.shape.forEach(function (row) {
        return row.reverse();
      });
      return p;
    }
    /* draw piece & grid */

  }, {
    key: "draw",
    value: function draw() {
      this.piece.draw(); // ctx 위에 현재 블록을 그림

      this.drawBoard(); // ctx 위에 현재 블록 전까지 쌓인 블록을 그림
    }
  }, {
    key: "drawBoard",
    value: function drawBoard() {
      var _this2 = this;

      console.log('----board----');
      console.table(this.grid);
      console.log('----board----');
      this.grid.forEach(function (row, y) {
        row.forEach(function (value, x) {
          if (value > 0) {
            // freeze() 함수를 통해 grid에 블록이 고정된 경우에만 이 조건실행문에 들어옴.
            _this2.ctx.fillStyle = _constants__WEBPACK_IMPORTED_MODULE_1__["COLORS"][value];

            _this2.ctx.fillRect(x, y, 1, 1);
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

  }, {
    key: "drop",
    value: function drop() {
      var p = _main__WEBPACK_IMPORTED_MODULE_2__["moves"][_constants__WEBPACK_IMPORTED_MODULE_1__["KEY"].DOWN](this.piece);

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
  }, {
    key: "freeze",
    value: function freeze() {
      var _this3 = this;

      // 블록이 쌓인 경우, 쌓인 블록을 ctx에 고정으로 draw함.
      this.piece.shape.forEach(function (row, y) {
        row.forEach(function (value, x) {
          if (value > 0) {
            _this3.grid[y + _this3.piece.y][x + _this3.piece.x] = value;
          }
        });
      });
    }
  }, {
    key: "clearLines",
    value: function clearLines() {
      var _this4 = this;

      var lines = 0;
      this.grid.forEach(function (row, y) {
        // If every value is greater than 0.
        if (row.every(function (value) {
          return value > 0;
        })) {
          lines++; // Remove the row.

          _this4.grid.splice(y, 1); // Add zero filled row at the top.


          _this4.grid.unshift(Array(_constants__WEBPACK_IMPORTED_MODULE_1__["COLS"]).fill(0));
        }
      });

      if (lines > 0) {
        // Calculate points from cleared lines and level.
        _main__WEBPACK_IMPORTED_MODULE_2__["account"].score += this.getLinesClearedPoints(lines);
        _main__WEBPACK_IMPORTED_MODULE_2__["account"].lines += lines; // If we have reached the lines for next level

        if (_main__WEBPACK_IMPORTED_MODULE_2__["account"].lines >= _constants__WEBPACK_IMPORTED_MODULE_1__["LINES_PER_LEVEL"]) {
          // Goto next level
          _main__WEBPACK_IMPORTED_MODULE_2__["account"].level++; // Remove lines so we start working for the next level

          _main__WEBPACK_IMPORTED_MODULE_2__["account"].lines -= _constants__WEBPACK_IMPORTED_MODULE_1__["LINES_PER_LEVEL"]; // Increase speed of game

          _main__WEBPACK_IMPORTED_MODULE_2__["time"].level = _constants__WEBPACK_IMPORTED_MODULE_1__["LEVEL"][_main__WEBPACK_IMPORTED_MODULE_2__["account"].level];
        }
      }
    }
  }, {
    key: "getLinesClearedPoints",
    value: function getLinesClearedPoints(lines, level) {
      var lineClearPoints = lines === 1 ? _constants__WEBPACK_IMPORTED_MODULE_1__["POINTS"].SINGLE : lines === 2 ? _constants__WEBPACK_IMPORTED_MODULE_1__["POINTS"].DOUBLE : lines === 3 ? _constants__WEBPACK_IMPORTED_MODULE_1__["POINTS"].TRIPLE : lines === 4 ? _constants__WEBPACK_IMPORTED_MODULE_1__["POINTS"].TETRIS : 0;
      return (_main__WEBPACK_IMPORTED_MODULE_2__["account"].level + 1) * lineClearPoints;
    }
  }]);

  return Board;
}();



/***/ }),

/***/ "./constants.js":
/*!**********************!*\
  !*** ./constants.js ***!
  \**********************/
/*! exports provided: COLS, ROWS, BLOCK_SIZE, LINES_PER_LEVEL, KEY, COLORS, SHAPES, POINTS, LEVEL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLS", function() { return COLS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROWS", function() { return ROWS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLOCK_SIZE", function() { return BLOCK_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LINES_PER_LEVEL", function() { return LINES_PER_LEVEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KEY", function() { return KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLORS", function() { return COLORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHAPES", function() { return SHAPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POINTS", function() { return POINTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEVEL", function() { return LEVEL; });
/* where we put the configurations and rules of the game. */
var COLS = 10;
var ROWS = 20;
var BLOCK_SIZE = 30;
var LINES_PER_LEVEL = 10;
var KEY = {
  // 각 숫자는 keydown이벤트의 keycode 값
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  P: 80,
  Q: 81
};
Object.freeze(KEY);
var COLORS = ['none', 'cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red'];
Object.freeze(COLORS);
var SHAPES = [[], [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], [[2, 0, 0], [2, 2, 2], [0, 0, 0]], [[0, 0, 3], // 0,0 -> 2,0 ; 0,1 -> 1,0 ; 0,2 -> 0,0
[3, 3, 3], // 1,0 -> 2,1 ; 1,1 -> 1,1 ; 1,2 -> 0,1
[0, 0, 0]], // 2,0 -> 2,2 ; 2,1 -> 1,2 ; 2,2 -> 0,2
[[4, 4], [4, 4]], [[0, 5, 5], [5, 5, 0], [0, 0, 0]], [[0, 6, 0], [6, 6, 6], [0, 0, 0]], [[7, 7, 0], [0, 7, 7], [0, 0, 0]]];
Object.freeze(SHAPES);
var POINTS = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  SOFT_DROP: 1,
  HARD_DROP: 2
};
Object.freeze(POINTS);
var LEVEL = {
  0: 800,
  1: 720,
  2: 630,
  3: 550,
  4: 470,
  5: 380,
  6: 300,
  7: 220,
  8: 130,
  9: 100,
  10: 80,
  11: 80,
  12: 80,
  13: 70,
  14: 70,
  15: 70,
  16: 50,
  17: 50,
  18: 50,
  19: 30,
  20: 30 // 29+ is 20ms

};
Object.freeze(LEVEL);

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! exports provided: time, account, moves */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "time", function() { return time; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "account", function() { return account; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moves", function() { return moves; });
/* harmony import */ var _board_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board.js */ "./board.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./constants.js");
var _moves;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* code to initialize the game and the overall game logic. */


var canvas = document.getElementById('board');
var ctx = canvas.getContext('2d');
var canvasNext = document.getElementById('next');
var ctxNext = canvasNext.getContext('2d');
/* initialize */

function initNext() {
  // Calculate size of canvas from constants.
  ctxNext.canvas.width = 4 * _constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_SIZE"];
  ctxNext.canvas.height = 4 * _constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_SIZE"];
  ctxNext.scale(_constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_SIZE"] / 2, _constants__WEBPACK_IMPORTED_MODULE_1__["BLOCK_SIZE"] / 2); // 샘플코드는 /2 를 안해도 잘 되는데 왜 나는 /2를 해야하는지 모르겠음.
}

initNext();
/* declare */

var board = new _board_js__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, ctxNext);
var requestId;
var time; // account (score/level/deleted lines)

var accountValues = {
  score: 0,
  level: 0,
  lines: 0
};
var account = new Proxy(accountValues, {
  set: function set(target, key, value) {
    target[key] = value;
    updateAccount(key, value);
    return true;
  }
});

function updateAccount(key, value) {
  var element = document.getElementById(key);

  if (element) {
    element.textContent = value; // 점수 누적
  }
}
/* play game */


function play() {
  resetGame();
  animate();
}

window.play = play;

function resetGame() {
  account.score = 0;
  account.lines = 0;
  account.level = 0;
  board.reset();
  time = {
    start: 0,
    elapsed: 0,
    level: _constants__WEBPACK_IMPORTED_MODULE_1__["LEVEL"][account.level]
  };
}

function animate() {
  var now = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  time.elapsed = now - time.start;

  if (time.elapsed > time.level) {
    time.start = now;

    if (!board.drop()) {
      gameOver();
      return;
    }
  } // Clear board before drawing new state.


  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  board.draw();
  requestId = requestAnimationFrame(animate);
}

function gameOver() {
  cancelAnimationFrame(requestId);
  ctx.fillStyle = 'black';
  ctx.fillRect(1, 3, 8, 1.2);
  ctx.font = '1px Arial';
  ctx.fillStyle = 'red';
  ctx.fillText('GAME OVER', 1.8, 4);
}
/* control */


var moves = (_moves = {}, _defineProperty(_moves, _constants__WEBPACK_IMPORTED_MODULE_1__["KEY"].LEFT, function (p) {
  return _objectSpread(_objectSpread({}, p), {}, {
    x: p.x - 1
  });
}), _defineProperty(_moves, _constants__WEBPACK_IMPORTED_MODULE_1__["KEY"].RIGHT, function (p) {
  return _objectSpread(_objectSpread({}, p), {}, {
    x: p.x + 1
  });
}), _defineProperty(_moves, _constants__WEBPACK_IMPORTED_MODULE_1__["KEY"].DOWN, function (p) {
  return _objectSpread(_objectSpread({}, p), {}, {
    y: p.y + 1
  });
}), _defineProperty(_moves, _constants__WEBPACK_IMPORTED_MODULE_1__["KEY"].SPACE, function (p) {
  return _objectSpread(_objectSpread({}, p), {}, {
    y: p.y + 1
  });
}), _defineProperty(_moves, _constants__WEBPACK_IMPORTED_MODULE_1__["KEY"].UP, function (p) {
  return board.rotate(p);
}), _moves);
document.addEventListener('keydown', function (e) {
  if (moves[e.keyCode]) {
    e.preventDefault(); // stop event bubbling

    var p = moves[e.keyCode](board.piece); // board.valid(p): true-벽에 안부딪힘 / false-벽에 부딪힘

    if (e.keyCode === _constants__WEBPACK_IMPORTED_MODULE_1__["KEY"].SPACE) {
      while (board.valid(p)) {
        // hard drop
        account.score += _constants__WEBPACK_IMPORTED_MODULE_1__["POINTS"].HARD_DROP;
        board.piece.move(p);
        p = moves[_constants__WEBPACK_IMPORTED_MODULE_1__["KEY"].DOWN](board.piece); // p가 while 조건문에 쓰이는걸 모르고 이 라인을 지웠다가 크롬 터짐
        // 왜냐면 DOWN을 통한 y+1 을 반복하지않으면, while문에 무한루프가 걸림
        // (y+1을 반복해야 바닥까지 닿아서 while문을 탈출할 수 있음)
      }
    } else if (board.valid(p)) {
      // 스페이스를 누르지 않은 경우
      board.piece.move(p);

      if (event.keyCode === _constants__WEBPACK_IMPORTED_MODULE_1__["KEY"].DOWN) {
        account.score += _constants__WEBPACK_IMPORTED_MODULE_1__["POINTS"].SOFT_DROP;
      }
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // 보드판 초기화

    board.piece.draw();
  }
});

/***/ }),

/***/ "./piece.js":
/*!******************!*\
  !*** ./piece.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Piece; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./constants.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/* for piece logic. */

var Piece = /*#__PURE__*/function () {
  /* 
  x : grid에서의 x 좌표
  y : grid에서의 y 좌표
  color : block 색
  shape : block 을 행렬로 표현한 2차원 배열
  ctx : canvas 객체
  */
  function Piece(ctx) {
    _classCallCheck(this, Piece);

    _defineProperty(this, "x", void 0);

    _defineProperty(this, "y", void 0);

    _defineProperty(this, "color", void 0);

    _defineProperty(this, "shape", void 0);

    _defineProperty(this, "ctx", void 0);

    _defineProperty(this, "typeId", void 0);

    this.ctx = ctx;
    this.spawn();
  }

  _createClass(Piece, [{
    key: "spawn",
    value: function spawn() {
      this.typeId = this.randomizeTetrominoType(_constants__WEBPACK_IMPORTED_MODULE_0__["COLORS"].length - 1);
      this.shape = _constants__WEBPACK_IMPORTED_MODULE_0__["SHAPES"][this.typeId];
      this.color = _constants__WEBPACK_IMPORTED_MODULE_0__["COLORS"][this.typeId]; // set starting position

      this.setStartingPosition();
      this.y = 0;
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this = this;

      this.ctx.fillStyle = this.color;
      this.shape.forEach(function (row, y) {
        row.forEach(function (value, x) {
          // x, y: shape 2차원 배열내에서 1의 값을 가진 원소의 인덱스
          // this.x, this.y : grid 내의 블록 위치
          if (value > 0) {
            // 원소 값이 1이면, 색을 채워서 블록 모양이 표시되도록함. (SHAPES 상수 참조)
            _this.ctx.fillRect(_this.x + x, _this.y + y, 1, 1);
          }
        });
      });
    }
  }, {
    key: "move",
    value: function move(p) {
      this.x = p.x;
      this.y = p.y;
      this.shape = p.shape;
    }
  }, {
    key: "randomizeTetrominoType",
    value: function randomizeTetrominoType(noOfTypes) {
      return Math.floor(Math.random() * noOfTypes + 1);
    }
  }, {
    key: "setStartingPosition",
    value: function setStartingPosition() {
      this.x = this.typeId === 4 ? 4 : 3;
    }
  }]);

  return Piece;
}();



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map