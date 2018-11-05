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


  isMatch(diamond){
    const dirs = [[-1, 0], [0, -1]];
    for (let i = 0; i < 2; i++) {
      const match = this.traverseUpLeft(diamond, dirs[i], 1);
      if (match) return true;
    }
    return false}

  traverseUpLeft(diamond, dir, count){
    if (count === 3) return true;
    const xNew = diamond.rowIdx + dir[0];
    const yNew = diamond.colIdx + dir[1];
    if (xNew < 0 || yNew < 0) return false;
    const nextDiamond = this.board[xNew][yNew];
    if (diamond.color === nextDiamond.color) {
      return this.traverseUpLeft(nextDiamond, dir, count + 1)
    } else {
      return false
    }
   }

  randomColor(){
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

  findMatches(){
    let matches = [];
    const explored = [];
    const dirs = [[1,0],[0,1]];
    for (let j =0; j<7; j++){
      for (let i=0; i<7; i++){
        let diamond = this.board[i][j];
        if (!explored.includes(diamond)){
          for (let d=0; d<2; d++){
            matches = this.traverseDownRight(matches, explored, diamond, dirs[d]);
          }
        }
      }
    }
  
    for (let m=0; m<matches.length; m++){
      matches[m].color = "black";
      matches[m].exist = false;
    }

    setTimeout(() => this.shiftBoard(), 100);
  }

  traverseDownRight(matches, explored, diamond, dir, path=[]){
    explored.push(diamond);
    path.push(diamond);
    const xNew = diamond.rowIdx+dir[0];
    const yNew = diamond.colIdx+dir[1];
    // debugger
    if (xNew > 6 || yNew > 6){
      if (path.length > 2){
        return matches.concat(path);
      } else {
        return matches;
      }
    }
    let nextDiamond = this.board[xNew][yNew]
    if (diamond.color === nextDiamond.color){
      return this.traverseDownRight(matches, explored, nextDiamond, dir, path);
    } else if (path.length > 2){
       return matches.concat(path);
    } else {
      return matches;
    }
  }

  removeMatches() {}

  shiftBoard() {
    // debugger
    for (let i=0; i<7; i++){
      for (let j=0; j<7; j++){
        let diamond = this.board[i][j];
        if (diamond.exist === false) {
          // debugger
          while (diamond.rowIdx >=1) {
            const xNew = diamond.rowIdx - 1;
            const yNew = diamond.colIdx;
            const nextDiamond = this.board[xNew][yNew]
            diamond.color = nextDiamond.color;
            diamond.exist = true;
            diamond.rowIdx -=1
          }
          this.board[0][j].color = this.randomColor();
        }
      }   
    }
  }

  // findSwaps() {
  //   const dirs = [[0, 1], [1, 0], [-1, 0], [0, -1]];
  //   for (let j=0; j<7; j++){
  //     for (let i=0; i<7; i++){
  //       let diamond = this.board[i][j];
  //       for (let d=0; d<4; d++){
  //         this.isValid(diamond, dirs[d])
  //       }
  //     }
  //   }
  // }

  // isValid(diamond, dir){

  // }

  // swap(x1, y1, x2, y2){
  //   color1 = this.board[x1][y1].color;
  //   color2 = this.board[x2][y2].color;
  //   if ( 
  //     (0<=x1===x2-1<=5) && (y1===y2) ||
  //     (0<=y1===y2-1<= 5) && (x1 === x2)
  //      ){
  //     this.board[x1][y1].color = color2;
  //     this.board[x2][y2].color = color2;
  //      }  
  // }



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
  
  attachEvent(){
    const canvasEl = document.getElementsByTagName("canvas")[0];
    const ctx = canvasEl.getContext("2d");
    let color1;
    let color2;
    const p = 400;

    canvasEl.addEventListener('mousedown', event => {
      
      this.oldY = parseInt((event.offsetX - p) / 65);
      this.oldX = parseInt((event.offsetY - 100) / 65);
      // this.board[this.oldX][this.oldY].size = 25
      console.log([parseInt((event.offsetY - 100) / 65), parseInt((event.offsetX - p) / 65)])
      
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
      
      this.newY = parseInt((event.offsetX - p) / 65);
      this.newX = parseInt((event.offsetY - 100) / 65); 
      console.log([parseInt((event.offsetY - 100) / 65), parseInt((event.offsetX - p) / 65)])
      
      color1 = this.board[this.oldX][this.oldY].color
      color2 = this.board[this.newX][this.newY].color
      this.board[this.newX][this.newY].color = color1
      this.board[this.oldX][this.oldY].color = color2
      
      setTimeout(()=> this.findMatches(), 100);
     
    })  
  }
  
    
    drawDiamonds(ctx) {
      for (let j = 0; j < 7; j ++) {    
        for (let i = 0; i < 7; i ++ ) {
          this.board[i][j].drawDiamond(ctx);
        }
      }
    } 

}


module.exports = Board;