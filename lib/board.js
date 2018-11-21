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
    for (let i = 0; i < 2; i++) {
      const match = this.traverseUpLeft(diamond, dirs[i], 1);
      if (match) return true;
    }
    return false;
  }

  drawDiamonds() {
    for (let j = 0; j < 7; j++) {
      for (let i = 0; i < 7; i++) {
        this.board[i][j].drawDiamond(this.ctx);
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

  shiftBoard(matches) {
    // debugger;
    matches.forEach(diamond => {
      let colIdx = diamond.colIdx;
      let rowIdx = diamond.rowIdx;

      while (rowIdx > 0) {
        const nextDiamond = this.board[rowIdx - 1][colIdx];
        // debugger;
        // this.board[xNew+1][yNew] = nextDiamond;
        // diamond = nextDiamond;
        // diamond.color = nextDiamond.color;

        this.board[rowIdx][colIdx] = nextDiamond;
        nextDiamond.rowIdx = rowIdx;
        nextDiamond.drawDiamond(this.ctx);
        rowIdx = rowIdx - 1;
      }
      // this.board[0][diamond.colIdx].color = this.randomColor();
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
      // debugger
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
    // const ctx = canvasEl.getContext("2d");
    const p = 400;

    canvasEl.addEventListener("mousedown", event => {
      this.oldY = parseInt((event.offsetX - p) / 65);
      this.oldX = parseInt((event.offsetY - 100) / 65);
    });

    canvasEl.addEventListener("mouseup", event => {
      this.newY = parseInt((event.offsetX - p) / 65);
      this.newX = parseInt((event.offsetY - 100) / 65);
      const xDiff = this.newX - this.oldX;
      const yDiff = this.newY - this.oldY;
      if (
        !(Math.abs(xDiff) === 1 && yDiff === 0) &&
        !(Math.abs(yDiff) === 1 && xDiff === 0)
      ) {
        alert("Invalid Moves!");
      } else {
        let diamond1 = this.board[this.oldX][this.oldY];
        let diamond2 = this.board[this.newX][this.newY];

        this.board[this.oldX][this.oldY] = diamond2;
        this.board[this.newX][this.newY] = diamond1;

        diamond1.rowIdx = this.newX;
        diamond1.colIdx = this.newY;
        diamond2.rowIdx = this.oldX;
        diamond2.colIdx = this.oldY;

        this.drawDiamonds();

        // The way we draw diamond is by giving property to this.board[x][y]
        setTimeout(() => this.findMatches(), 100);
      }
      // debugger
      // let temp1 = this.board[this.oldX][this.oldY];
      // let temp2 = this.board[this.newX][this.newY];
      // this.board[this.newX][this.newY] = temp1;
      // this.board[this.oldX][this.oldY] = temp2;

      // here we try to change position then change object but the color is still the same

      // let [X, Y] = [this.oldX, this.oldY];
      // [this.oldX, this.oldY] = [this.newX, this.newY]
      // [this.newX, this.newY] = [X, Y];

      // Change color => repaint works;
    });
  }
}


module.exports = Board;