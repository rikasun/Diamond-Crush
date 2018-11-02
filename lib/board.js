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
      // findValidMoves();
      // if (moves.length > 0) {
      //   ready = true;
      // }
    // }
  }

  resolveMatches() {
    this.findMatches();
    // this.removeMatches();
    while (matches.length > 1){
      this.shiftBoard();
      this.findMatches();
    }
  }

  findMatches() {
    let matches;
    let matchLength;
    let nextMatch;
    // Vertical
    for (let j = 0; j < 7; j++) {
      matchLength = 1;
      matches = [];
      nextMatch =false;
      for (let i = 0; i < 5; i++) {
        if (
          this.board[i][j].color == this.board[i + 1][j].color
        ) {
          nextMatch = true
          matchLength += 1
        } else {
          nextMatch = false
        } 

        if (matchLength >= 3 && nextMatch ===false ){
      
          matches.push(this.board[j].slice(i - matchLength, i+1));
          // change their exist = false
          for (let a = 0; a<matches.length; a++){
            matches[a].exist = false;
          }
        }
      }
    }
    // Horizontal to write

  }

  removeMatches() {
   
  }

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

  findValidMoves() {
    
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