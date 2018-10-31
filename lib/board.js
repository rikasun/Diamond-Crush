const Diamond = require("./diamond");


class Board {
  constructor() {
    this.board = Array.from(Array(4), () => new Array(8));
  }

  addDiamonds() {
    const colors = ["red", "yellow", "orange", "blue", "green", "purple"];
    const ranIndex = Math.floor(Math.random() * colors.length);
    let ready = false;
    while (!ready) {
      for (var i = 0; i <= 7; i++) {
        for (var j = 0; j <= 7; j++) {
          this.board[i][j] = new Diamond(colors[ranIndex]);
        }
      }

      this.resolveMatches();
      let moves = [];
      findMoves();
      if (moves.length > 0) {
        ready = true;
      }
    }
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
    for (let j = 0; j < 8; j++) {
      matchLength = 1;
      for (let i = 0; i < 8; i++) {
        isMatch = true;

        if (i == 7) {
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

    for (let i = 0; i < 8; i++) {
      matchLength = 1;
      for (let j = 0; j < 8; j++) {
        isMatch = true;

        if (j == 7) {
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

  drawDiamonds(ctx) {
    const diamonds = [];
    
    while (diamonds.length < 50) {
      const size = 20;
      for (let j = 130; j <= 555; j += 65) {
        for (let i = 130; i <= 555; i += 65) {
          const colors = ["red", "yellow", "orange", "blue", "green", "purple"];
          const ranIndex = Math.floor(Math.random() * colors.length);
          const diamond = new Diamond(i, j, size, colors[ranIndex]);
          diamonds.push(diamond);
        }
      }
    }

    for (let i = 0; i < diamonds.length; i++) {
      diamonds[i].drawDiamond(ctx);
    }

    // requestAnimationFrame(this.drawDiamonds(ctx));
  }
}


module.exports = Board;