const Board = require("./board");
// const Diamond = require("./diamond");


class Game {
  constructor(ctx){
    this.ctx = ctx;
  }


  start(ctx){
    this.board = new Board()
    this.board.drawBoard(ctx);
    this.board.drawDiamonds(ctx);
    this.draw()
  }

  draw() {
    this.board.drawDiamonds(this.ctx);    
    requestAnimationFrame(this.draw.bind(this))
  }
}


module.exports = Game;