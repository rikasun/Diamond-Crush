const Diamond = require("./diamond");


class Board {
  constructor(ctx) {
    this.board = Array.from(Array(7), () => new Array(7));
    this.oldX = 0;
    this.oldY = 0;
    this.newX = 0;
    this.newY = 0;
    this.ctx = ctx;
    this.addDiamonds();
    this.attachEvent();
  }

  isMatch(diamond) {
    const dirs = [[-1, 0], [0, -1]];
    for (let i = 0; i < 2; i++) {
      const match = this.traverseUpLeft(diamond, dirs[i], 1);
      if (match) return true;
    }
    return false;
  }

  // When populating the board, ensure there are no matches
  traverseUpLeft(diamond, dir, count) {
    // debugger
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
    for (var j = 0; j < 7; j++) {
      for (var i = 0; i < 7; i++) {
        let randColor = this.randomColor();
        let diamond = new Diamond(j, i, 20, randColor);
        this.board[i][j] = diamond;
        while (this.isMatch(diamond)) {
          diamond.color = this.randomColor();
        }
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
        let diamond = this.board[i][j];
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

    // for (let m = 0; m < matches.length; m++) {
    //   matches[m].color = "black";
    //   matches[m].exist = false;
    //   matches[m].drawDiamond(this.ctx);
    // }

    this.shiftBoard(matches);
  }

  traverseDownRight(matches, explored, diamond, dir, path = []) {
    // debugger;
    explored.push(diamond);
    path.push(diamond);
    if (path.length > 2) {
      // console.log(path);
    }
    const xNew = diamond.rowIdx + dir[0];
    const yNew = diamond.colIdx + dir[1];
    // debugger

    if (xNew > 6 || yNew > 6) {
      if (path.length > 2) {
        return matches.concat(path);
      } else {
        return matches;
      }
    }
    let nextDiamond = this.board[xNew][yNew];
    if (diamond.color === nextDiamond.color) {
      return this.traverseDownRight(matches, explored, nextDiamond, dir, path);
    } else if (path.length > 2) {
      return matches.concat(path);
    } else {
      return matches;
    }
  }

  // shiftBoard() {
  //   // debugger
  //   for (let i = 0; i < 7; i++) {
  //     for (let j = 0; j < 7; j++) {
  //       let diamond = this.board[i][j];
  //       if (diamond.exist === false) {
  //         // debugger
  //         while (diamond.rowIdx >= 1) {
  //           const xNew = diamond.rowIdx - 1;
  //           const yNew = diamond.colIdx;
  //           const nextDiamond = this.board[xNew][yNew];
  //           diamond.color = nextDiamond.color;
  //           diamond.exist = true;
  //           diamond.rowIdx -= 1;
  //         }
  //         this.board[0][j].color = this.randomColor();
  //       }
  //     }
  //   }
  // }

  shiftBoard(matches) {
    matches.forEach(diamond => {
      // debugger;
      while (diamond.rowIdx >= 1) {
        const xNew = diamond.rowIdx - 1;
        const yNew = diamond.colIdx;
        const nextDiamond = this.board[xNew][yNew];
        diamond.color = nextDiamond.color;

        diamond.rowIdx -= 1;
        diamond.drawDiamond(this.ctx);
      }
      this.board[0][diamond.colIdx].color = this.randomColor();
      this.board[0][diamond.colIdx].drawDiamond(this.ctx);
    });
  }

  drawBoard(ctx) {
    //length of a square
    const a = 65;
    //padding to the canvas
    const p = 400;

    for (var x = p; x <= 7 * a + p; x += a) {
      ctx.moveTo(x, 100);
      ctx.lineTo(x, 7 * a + 100);
    }

    for (var x = 100; x <= 7 * a + 100; x += a) {
      ctx.moveTo(p, x);
      ctx.lineTo(7 * a + p, x);
    }

    ctx.strokeStyle = "lightsteelblue";
    ctx.stroke();
  }

  attachEvent() {
    const canvasEl = document.getElementsByTagName("canvas")[0];
    // const ctx = canvasEl.getContext("2d");
    const p = 400;

    canvasEl.addEventListener("mousedown", event => {
      this.oldY = parseInt((event.offsetX - p) / 65);
      this.oldX = parseInt((event.offsetY - 100) / 65);
    });

    canvasEl.addEventListener("mouseup", event => {
      this.newY = parseInt((event.offsetX - p) / 65);
      this.newX = parseInt((event.offsetY - 100) / 65);

      let color1 = this.board[this.oldX][this.oldY].color;
      let color2 = this.board[this.newX][this.newY].color;
      this.board[this.newX][this.newY].color = color1;
      this.board[this.oldX][this.oldY].color = color2;
      this.board[this.newX][this.newY].drawDiamond(this.ctx);
      this.board[this.oldX][this.oldY].drawDiamond(this.ctx);

      setTimeout(() => this.findMatches(), 100);
    });
  }

  drawDiamonds(ctx) {
    for (let j = 0; j < 7; j++) {
      for (let i = 0; i < 7; i++) {
        this.board[i][j].drawDiamond(ctx);
      }
    }
  }
}


module.exports = Board;