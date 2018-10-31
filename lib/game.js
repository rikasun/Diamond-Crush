const Board = require("./board");
const Diamond = require("./diamond");


class Game {
  constructor(ctx){
    this.ctx = ctx;
  }


  start(ctx){
    const board = new Board()
    board.drawBoard(ctx);
    board.drawDiamonds(ctx);
  }
}


module.exports = Game;