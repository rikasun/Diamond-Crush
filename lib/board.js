const Diamond = require("./diamond");


class Board {
  constructor() {
    this.board = Array.from(Array(7), () => new Array(7));
    this.oldX = 0;
    this.oldY = 0;
    this.newX = 0;
    this.newY = 0;  
    this.addDiamonds();
    this.attachEvent();
    // this.isMatch = this.isMatch.bind(this);
  }


isMatch(diamond){
  const dirs = [[-1, 0], [0, -1]];
  // dirs.forEach(dir=>{
  //   const match = this.traverse(diamond, dir)
  //  if (match) return true
  // })
  for (let i = 0; i < 2; i++) {
    const match = this.traverse(diamond, dirs[i], 1);
    if (match) return true;
  }
  return false}

  traverse(diamond, dir, count){
    console.log(diamond, count);
    if (count === 3) return true;
    const xNew = diamond.colIdx + dir[0];
    const yNew = diamond.rowIdx + dir[1];
    // debugger
    if (xNew < 0 || yNew < 0) return false;
    const nextDiamond = this.board[xNew][yNew];
    // debugger;
    if (diamond.color === nextDiamond.color) {
      return this.traverse(nextDiamond, dir, count + 1)
    } else {
      return false
    }
   }

  randomColor(){
    const colors = ["red", "yellow", "orange", "blue", "green", "purple"];
    const ranIndex = Math.floor(Math.random() * colors.length);
    return colors[ranIndex];
  }

  addDiamonds() {  
    // debugger
      for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
          let randColor = this.randomColor();
          let diamond = new Diamond(i, j, 20, randColor);
          this.board[i][j] = diamond;
          while (this.isMatch(diamond)) {
            console.log(diamond);
            diamond.color = this.randomColor();
          }       
        }
      }
  }

  // findMatches() {
  //   let matches;
  //   let matchLength;
  //   let nextMatch;
  //   // Vertical
  //   // debugger;
  //   for (let j = 0; j < 7; j++) {
  //     matchLength = 1;
  //     matches = [];
  //     nextMatch =false;
  //     for (let i = 0; i < 5; i++) {
  //       if (
  //         this.board[i][j].color == this.board[i + 1][j].color
  //       ) {
  //         nextMatch = true
  //         matchLength += 1
  //       } else {
  //         nextMatch = false
  //       } 

  //       if (matchLength >= 3 && nextMatch ===false ){
      
  //         matches.push(this.board[j].slice(i - matchLength, i+1));
  //         // change their exist = false
  //         for (let a = 0; a<matches.length; a++){
  //           matches[a].exist = false;
  //           matches[a].color = "black"
  //         }
  //       }
  //     }
  //   }
  //   // Horizontal to write
  // }

  removeMatches() {}

  shiftBoard() {
    const colors = ["red", "yellow", "orange", "blue", "green", "purple"];
    const ranIndex = Math.floor(Math.random() * colors.length);
    for (let i=0; i<7; i++){
      for (let j=0; j<7; j++){
        if (this.board[i][j].exist = false) {
          // only the horizontal matches case
          for (let a=j-1; a>0; a--){
            this.board[i][a].color = this.board[i][a-1].color
          }
          this.board[i][0] = new Diamond(i, 0, 20, colors[ranIndex]);
        }
      }
    }

  }

  findValidSwaps() {
    for (let i=0; i<7; i++){
      for (let j=0; j<7; j++){
        // try to swap 
        // findMatches();
        // if find matches
        // there is valid swaps
      }
    }
  }

  swap(x1, y1, x2, y2){
    color1 = this.board[x1][y1].color;
    color2 = this.board[x2][y2].color;
    if ( 
      (0<=x1===x2-1<=5) && (y1===y2) ||
      (0<=y1===y2-1<= 5) && (x1 === x2)
       ){
      this.board[x1][y1].color = color2;
      this.board[x2][y2].color = color2;
       }  
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
  
  attachEvent(){
    const canvasEl = document.getElementsByTagName("canvas")[0];
    const ctx = canvasEl.getContext("2d");
    let color1;
    let color2;

    canvasEl.addEventListener('mousedown', event => {
      
      this.oldX = parseInt((event.offsetX - 100) / 65);
      this.oldY = parseInt((event.offsetY - 100) / 65);
      // this.board[this.oldX][this.oldY].size = 25
      // console.log([parseInt((event.offsetX - 100) / 65), parseInt((event.offsetY - 100) / 65)])
      
      // ctx.strokeStyle = "black";
      // ctx.beginPath();
      // ctx.moveTo(this.oldX * 65 + 130, this.oldY * 65 + 130);
    })
    
    canvasEl.addEventListener('mousemove', event => {
      
      // ctx.lineTo(this.oldX * 65 + 130 + event.clientX, this.oldY * 65 + 130 + event.clientY);
      // ctx.stroke();
      // ctx.closePath();
    })
      
    
    canvasEl.addEventListener('mouseup', event => {
      // this.board[this.oldX][this.oldY].size = 20;
      
      this.newX = parseInt((event.offsetX - 100) / 65);
      this.newY = parseInt((event.offsetY - 100) / 65); 
      // console.log([parseInt((event.offsetX - 100) / 65), parseInt((event.offsetY - 100) / 65)])
      
      color1 = this.board[this.oldX][this.oldY].color
      color2 = this.board[this.newX][this.newY].color
      this.board[this.newX][this.newY].color = color1
      this.board[this.oldX][this.oldY].color = color2
      this.findMatches();
      }) 
    
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