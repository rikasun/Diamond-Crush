const Game = require("./game")

document.addEventListener("DOMContentLoaded", () => {
  console.log("Webpack is working")
  const canvasEl = document.getElementsByTagName("canvas")[0];
  const width = canvasEl.width = window.innerWidth;
  const height = canvasEl.height = window.innerHeight;
  const ctx = canvasEl.getContext("2d");
  
  const game = new Game(ctx);
  game.start(ctx);

});

