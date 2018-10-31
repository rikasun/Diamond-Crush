const Diamond = require("./diamond");


class Board {
  constructor() {
    this.board = Array.from(Array(7), () => new Array(7));
    this.addDiamonds();
  }

  addDiamonds() {
    const colors = ["red", "yellow", "orange", "blue", "green", "purple"];
    // let ready = false;
    // while (!ready) {
      for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
          const ranIndex = Math.floor(Math.random() * colors.length);
          this.board[i][j] = new Diamond(i, j, 20, colors[ranIndex]);
        }
      }

      // this.resolveMatches();
      // let moves = [];
      // findMoves();
      // if (moves.length > 0) {
      //   ready = true;
      // }
    // }
  }

  resolveMatches() {
    this.findMatches();
    while (matches.length > 0) {
      this.removeMatches();
      this.shiftBoard();
      this.findMatches();
    }
  }

  findMatches() {
    let matches = [];
    let matchLength;
    let isMatch;
    for (let j = 0; j < 7; j++) {
      matchLength = 1;
      for (let i = 0; i < 7; i++) {
        isMatch = true;

        if (i == 6) {
          isMatch = false;
        } else {
          if (
            this.board[i][j].color == this.board[i + 1][j].color &&
            this.board[i][j].color
          ) {
            matchLength += 1;
          } else {
            isMatch = false;
          }
        }

        if (isMatch && matchLength >= 3) {
          matches.push(this.board[i][j + 1 - matchLength]);
          matchLength = 1;
        }
      }
    }

    for (let i = 0; i < 7; i++) {
      matchLength = 1;
      for (let j = 0; j < 7; j++) {
        isMatch = true;

        if (j == 6) {
          isMatch = false;
        } else {
          if (
            this.board[i][j].color == this.board[i][j + 1].color &&
            this.board[i][j].color
          ) {
            matchLength += 1;
          } else {
            isMatch = false;
          }
        }

        if (isMatch && matchLength >= 3) {
          matches.push(this.board[i + 1 - matchLength][j]);
          matchLength = 1;
        }
      }
    }
  }

  removeMatches() {}

  shiftBoard() {}

  findMoves() {
    moves = [];
  }

  drawBoard(ctx) {
    //length of a square
    const a = 65;
    //padding to the canvas
    const p = 100;

    for (var x = p; x <= 7 * a + p; x += a) {
      ctx.moveTo(x, p);
      ctx.lineTo(x, 7 * a + p);
    }

    for (var x = p; x <= 7 * a + p; x += a) {
      ctx.moveTo(p, x);
      ctx.lineTo(7 * a + p, x);
    }

    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  // keeps drawing 60 times a second so its animation
  drawDiamonds(ctx) {
    // console.log("draw board");
    for (let j = 0; j < 7; j ++) {    
      for (let i = 0; i < 7; i ++ ) {
        this.board[i][j].drawDiamond(ctx);
      }
    }
  } 
}


module.exports = Board;