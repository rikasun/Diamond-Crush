const Board = require("./board");
const Timer = require('./timer');


class Game {
  constructor(ctx){
    this.ctx = ctx;
  }


  start(ctx){
    this.board = new Board(ctx);
    this.board.drawBoard();
    this.board.drawDiamonds();

    // if (this.board.points >=3000) {
    //   alert('you win!')
    // } else {
    //   alert('you lose!')
    // }
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