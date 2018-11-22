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
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/board.js":
/*!**********************!*\
  !*** ./lib/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Diamond = __webpack_require__(/*! ./diamond */ "./lib/diamond.js");

class Board {
  constructor(ctx) {
    this.board = Array.from(Array(7), () => new Array(7));
    this.oldX = 0;
    this.oldY = 0;
    this.newX = 0;
    this.newY = 0;
    this.ctx = ctx;
    this.addDiamonds();
    this.addTouchEvent();
    this.attachEvent();
  }

  // When populating the board, ensure there are no matches
  traverseUpLeft(diamond, dir, count) {
    if (count === 3) return true;
    const xNew = diamond.rowIdx + dir[0];
    const yNew = diamond.colIdx + dir[1];
    if (xNew < 0 || yNew < 0) return false;

    const nextDiamond = this.board[xNew][yNew];
    if (diamond.color === nextDiamond.color) {
      return this.traverseUpLeft(nextDiamond, dir, count + 1);
    } else {
      return false;
    }
  }

  randomColor() {
    const colors = ["red", "yellow", "orange", "lime", "fuchsia", "blue"];
    const ranIndex = Math.floor(Math.random() * colors.length);
    return colors[ranIndex];
  }

  addDiamonds() {
    for (var i = 0; i < 7; i++) {
      for (var j = 0; j < 7; j++) {
        let randColor = this.randomColor();
        let diamond = new Diamond(i, j, 20, randColor);
        this.board[j][i] = diamond;
        while (this.isMatch(diamond)) {
          diamond.color = this.randomColor();
        }
      }
    }
  }

  isMatch(diamond) {
    const dirs = [[-1, 0], [0, -1]];
    for (let d = 0; d < 2; d++) {
      const match = this.traverseUpLeft(diamond, dirs[d], 1);
      if (match) return true;
    }
    return false;
  }

  drawDiamonds() {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        this.board[j][i].drawDiamond(this.ctx);
      }
    }
  }

  // When user is playing game - called after swaps
  findMatches() {
    let matches = [];
    const explored = [];
    const dirs = [[1, 0], [0, 1]];

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        let diamond = this.board[j][i];
        if (!explored.includes(diamond)) {
          for (let d = 0; d < 2; d++) {
            matches = this.traverseDownRight(
              matches,
              explored,
              diamond,
              dirs[d]
            );
          }
        }
      }
    }

    // console.log(matches);
    this.shiftBoard(matches);
  }

  shiftBoard(matches) {
    // debugger;
    matches.forEach(diamond => {
      let colIdx = diamond.colIdx;
      let rowIdx = diamond.rowIdx;

      while (rowIdx > 0) {
      
        const nextDiamond = this.board[rowIdx - 1][colIdx];
        this.board[rowIdx][colIdx] = nextDiamond;
        nextDiamond.rowIdx = rowIdx;
        nextDiamond.drawDiamond(this.ctx);
        rowIdx = rowIdx - 1;
      }
     
      let newDiamond = new Diamond(colIdx, 0, 20, this.randomColor())
      this.board[0][colIdx] = newDiamond;
      newDiamond.drawDiamond(this.ctx);
    });
  }

  traverseDownRight(matches, explored, diamond, dir, path = []) {
    // debugger;
    explored.push(diamond);
    path.push(diamond);
    if (path.length > 2) {
    }
    const xNew = diamond.rowIdx + dir[0];
    const yNew = diamond.colIdx + dir[1];

    if (xNew > 6 || yNew > 6) {
      if (path.length > 2) {
        return matches.concat(path);
      } else {
        return matches;
      }
    }
    let nextDiamond = this.board[xNew][yNew];
    if (diamond.color === nextDiamond.color) {
      // debugger
      return this.traverseDownRight(matches, explored, nextDiamond, dir, path);
    } else if (path.length > 2) {
      return matches.concat(path);
    } else {
      return matches;
    }
  }

  drawBoard() {
    //length of a square
    const a = 65;
    //padding to the canvas
    const p = 400;

    for (var x = p; x <= 7 * a + p; x += a) {
      this.ctx.moveTo(x, 100);
      this.ctx.lineTo(x, 7 * a + 100);
    }

    for (var x = 100; x <= 7 * a + 100; x += a) {
      this.ctx.moveTo(p, x);
      this.ctx.lineTo(7 * a + p, x);
    }

    this.ctx.strokeStyle = "lightsteelblue";
    this.ctx.stroke();
  }

  attachEvent() {
    const canvasEl = document.getElementsByTagName("canvas")[0];
    const p = 400;

    canvasEl.addEventListener("mousedown", event => {
      this.oldY = parseInt((event.offsetX - p) / 65);
      this.oldX = parseInt((event.offsetY - p/4) / 65);
    });

    canvasEl.addEventListener("mouseup", event => {
      this.newY = parseInt((event.offsetX - p) / 65);
      this.newX = parseInt((event.offsetY - p/4) / 65);
      const xDiff = this.newX - this.oldX;
      const yDiff = this.newY - this.oldY;
      if (
        !(Math.abs(xDiff) === 1 && yDiff === 0) &&
        !(Math.abs(yDiff) === 1 && xDiff === 0)
      ) {
        alert("Invalid Moves!");
      } else {
        // Need to add another logic to make sure there is matches
        let diamond1 = this.board[this.oldX][this.oldY];
        let diamond2 = this.board[this.newX][this.newY];

        this.board[this.oldX][this.oldY] = diamond2;
        this.board[this.newX][this.newY] = diamond1;

        diamond1.rowIdx = this.newX;
        diamond1.colIdx = this.newY;
        diamond2.rowIdx = this.oldX;
        diamond2.colIdx = this.oldY;

        this.drawDiamonds();
        // this.findMatches();
        let noMatchLeft = false;
        while (!noMatchLeft) {   
          for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 7; j++) {
              noMatchLeft = true;
               if (this.isMatch(this.board[j][i])){
                this.findMatches();
                noMatchLeft = false;
              }
            }
          }
        }

        this.drawDiamonds()
        // setTimeout(() => this.findMatches(), 100);
      }
    });
  }


  addTouchEvent() {
    const canvasEl = document.getElementsByTagName("canvas")[0];
    const p = 400;

    canvasEl.addEventListener("touchstart", event => {
      this.oldY = parseInt((event.offsetX - p) / 65);
      this.oldX = parseInt((event.offsetY - p / 4) / 65);
    }, false);

    canvasEl.addEventListener("touchmove", function(event) {
        event.preventDefault();
      }, false); 

    canvasEl.addEventListener("touchend", event => {
      event.preventDefault();
      this.newY = parseInt((event.offsetX - p) / 65);
      this.newX = parseInt((event.offsetY - p / 4) / 65);
      const xDiff = this.newX - this.oldX;
      const yDiff = this.newY - this.oldY;
      if (
        !(Math.abs(xDiff) === 1 && yDiff === 0) &&
        !(Math.abs(yDiff) === 1 && xDiff === 0)
      ) {
        alert("Invalid Moves!");
      } else {
        // Need to add another logic to make sure there is matches
        let diamond1 = this.board[this.oldX][this.oldY];
        let diamond2 = this.board[this.newX][this.newY];

        this.board[this.oldX][this.oldY] = diamond2;
        this.board[this.newX][this.newY] = diamond1;

        diamond1.rowIdx = this.newX;
        diamond1.colIdx = this.newY;
        diamond2.rowIdx = this.oldX;
        diamond2.colIdx = this.oldY;

        this.drawDiamonds();
        // this.findMatches();
        let noMatchLeft = false;
        while (!noMatchLeft) {
          for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 7; j++) {
              noMatchLeft = true;
              if (this.isMatch(this.board[j][i])) {
                this.findMatches();
                noMatchLeft = false;
              }
            }
          }
        }

        this.drawDiamonds()
        // setTimeout(() => this.findMatches(), 100);
      }
    }, false);
  }
}


module.exports = Board;

/***/ }),

/***/ "./lib/diamond.js":
/*!************************!*\
  !*** ./lib/diamond.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Diamond {

  constructor(colIdx, rowIdx, size, color){
    this.colIdx = colIdx;
    this.rowIdx = rowIdx
    this.size = size;
    this.color = color;
  }

  drawDiamond(ctx){
    const x = this.colIdx * 65 + 432.5;
    const y = this.rowIdx * 65 + 132.5;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(x, y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }


  // drawDiamond(ctx) {
  //     const d = 65
  //     //Ruby's
  //     var x = 105; var y = 125;
  //     var w = 55; var h = 50;
  //     let colors = ['#E3170D', '#9D1309', '#F22C1E'];
  //     this.sketch(x, y, w, h, ctx, colors);
  //     this.sketch(x+d, y, w, h, ctx, colors);
  //     this.sketch(x+2*d, y, w, h, ctx, colors);    
  // }

  // sketch(x, y, w, h, ctx, colors) {
  //   ctx.fillStyle = colors[0];
  //   ctx.beginPath();
  //   ctx.moveTo(x, y);
  //   ctx.lineTo(x + w / 2, y + 0.7 * h);
  //   ctx.lineTo(x + w / 2, y);
  //   ctx.fill();
  
  //   ctx.fillStyle = colors[1];
  //   ctx.beginPath();
  //   ctx.moveTo(x + w / 2, y);
  //   ctx.lineTo(x + w / 2, y + 0.7 * h);
  //   ctx.lineTo(x + w, y);
  //   ctx.fill();
  
  //   // Upper left triangle
  //   ctx.beginPath();
  //   ctx.moveTo(x + w / 4, y - 0.3 * h);
  //   ctx.lineTo(x, y);
  //   ctx.lineTo(x + w / 2, y);
  //   ctx.fill();
  
  //   // centre inverted triangle
  //   ctx.fillStyle = colors[2];
  //   ctx.beginPath();
  //   ctx.moveTo(x + w / 4, y - 0.3 * h);
  //   ctx.lineTo(x + w / 2, y);
  //   ctx.lineTo(x + 0.75 * w, y - 0.3 * h);
  //   ctx.fill();
  
  //   //Upper left triangle.
  //   ctx.fillStyle = colors[0];
  //   ctx.beginPath();
  //   ctx.moveTo(x + 0.75 * w, y - 0.3 * h);
  //   ctx.lineTo(x + w / 2, y);
  //   ctx.lineTo(x + w, y);
  //   ctx.fill();
  
  // }
}

module.exports = Diamond


// //Saphires's
// var x = 300; var y = 100;
// var w = 200; var h = 200;
// colors = ['#3366CC', '#003399', '#333399'];
// sketch(x, y, w, h, ctx, colors);

// //Emerald's
// var x = 500; var y = 100;
// var w = 200; var h = 200;
// colors = ['#4BB74C', '#517B58', '#5B9C64'];
// sketch(x, y, w, h, ctx, colors);

/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(/*! ./board */ "./lib/board.js");
const Timer = __webpack_require__(/*! ./timer */ "./lib/timer.js");


class Game {
  constructor(ctx){
    this.ctx = ctx;
  }


  start(ctx){
    this.board = new Board(ctx);
    this.board.drawBoard();
    this.board.drawDiamonds();
    }
      // this.attachListener(this.board);
   

  draw() {
    // this.board.drawDiamonds(this.ctx);    
    // requestAnimationFrame(this.draw.bind(this))
  }

  // attachListener(board) {
  //   const body = document.getElementsByTagName('body')[0];
  //   body.addEventListener('click', () => {
  //     board.findMatches();
  //     console.log(Object.assign(board));
  //   })
  // }
}


module.exports = Game;

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game */ "./lib/game.js")
const Timer = __webpack_require__(/*! ./timer */ "./lib/timer.js")

document.addEventListener("DOMContentLoaded", () => {
  console.log("Webpack is working")
  const canvasEl = document.getElementsByTagName("canvas")[0];
  const canvasEl1 = document.getElementsByTagName("canvas")[1];
  const width = canvasEl.width = window.innerWidth;
  const height = canvasEl.height = window.innerHeight;
  const ctx = canvasEl.getContext("2d");
  const ctx1 = canvasEl1.getContext("2d");
  
  const game = new Game(ctx);
  const timer = new Timer(ctx1)
  game.start(ctx);
  timer.beginTimer()

});



/***/ }),

/***/ "./lib/timer.js":
/*!**********************!*\
  !*** ./lib/timer.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {


class Timer {
  constructor(ctx){
    this.ctx = ctx;
    this.clock = document.getElementById('clock');
    this.timer = document.getElementById('timer');
  }
  

  colourChanger(intAngle) {
   // RGB values
   // Green: 	 51 153  0
   // Orange:	244 138  0
   // Red:		255   0  0
   intAngle = 6.29 - intAngle;
  
   if (Math.floor(72 + 55 * intAngle) < 255 || Math.floor(214 + 14 * intAngle) < 255) {
     return 'rgb(' + Math.floor(72 + 55 * intAngle) + ',' + Math.floor(214 + 14 * intAngle) + ',0)';
   } else {
     return 'rgb(' + Math.floor(255) + ',' + Math.floor(597 - (90 * intAngle)) + ',0)';
   }
  }
  
  
  beginTimer() {
   var dateStart = new Date();
   dateStart = dateStart.getTime(); 
   window.setInterval(() => this.countDownClock(dateStart, 60000), 500);
  }
  
  countDownClock(dateStart, timer) {

  this.timer = document.getElementById('timer')
  
   var d = new Date();
 
   window.intOffset = timer - (d.getTime() - dateStart);

   this.timer.textContent = (Math.ceil(window.intOffset / 1000));

   window.intAngle = 0.1048335 * 0.001 * window.intOffset;

   this.ctx.clearRect(0, 0, 400, 400);

   // Grey background ring
   this.ctx.beginPath();
   this.ctx.globalAlpha = 1;
   this.ctx.arc(150, 150, 140, 0, 6.283, false);
   this.ctx.arc(150, 150, 105, 6.283, ((Math.PI * 2)), true);
   this.ctx.fillStyle = "#bbb";
   this.ctx.fill();
   this.ctx.closePath();

   // Clock face ring
   this.ctx.beginPath();
   this.ctx.globalAlpha = 1;
   this.ctx.arc(150, 150, 140.1, -1.57, (-1.57 + window.intAngle), false);
   this.ctx.arc(150, 150, 105, (-1.57 + window.intAngle), ((Math.PI * 2) - 1.57), true);
   this.ctx.fillStyle = this.colourChanger(window.intAngle);
   this.ctx.fill();
   this.ctx.closePath();

   // Centre circle
   this.ctx.beginPath();
   this.ctx.arc(150, 150, 105, 0, 6.283, false);
   this.ctx.fillStyle = "#fff";
   this.ctx.fill();
   this.ctx.closePath();

    if (window.intOffset <= 0) // If time is up
     {this.timeUp()}
    else {
      // setTimeout("this.countDownClock(" + dateStart + "," + 60000 + ")", 50);
    }
  }
  
  
  // Time up - reset buttons
   timeUp(){
     this.clock.style.display='none'
     this.timer.style.display='none'
    //  alert('Time is up!')
  }

}

module.exports = Timer;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map