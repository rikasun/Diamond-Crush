const Game = require("./game")
const Timer = require("./timer")

document.addEventListener("DOMContentLoaded", () => {
  console.log("Webpack is working")
  const canvasEl = document.getElementsByTagName("canvas")[0];
  const canvasEl1 = document.getElementsByTagName("canvas")[1];
  const width = canvasEl.width = window.innerWidth;
  const height = canvasEl.height = window.innerHeight;
  const ctx = canvasEl.getContext("2d");
  const ctx1 = canvasEl1.getContext("2d");
  
  const game = new Game(ctx);
  const timer = new Timer(ctx1)
  game.start(ctx);
  timer.beginTimer()

});

