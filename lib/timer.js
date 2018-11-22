// const Board = require("./board");
class Timer {
  constructor(ctx){
    this.ctx = ctx;
    this.clock = document.getElementById('clock');
    this.timer = document.getElementById('timer');
  }
  

  colourChanger(intAngle) {
   // RGB values
   // Green: 	 51 153  0
   // Orange:	244 138  0
   // Red:		255   0  0
   intAngle = 6.29 - intAngle;
  
   if (Math.floor(72 + 55 * intAngle) < 255 || Math.floor(214 + 14 * intAngle) < 255) {
     return 'rgb(' + Math.floor(72 + 55 * intAngle) + ',' + Math.floor(214 + 14 * intAngle) + ',0)';
   } else {
     return 'rgb(' + Math.floor(255) + ',' + Math.floor(597 - (90 * intAngle)) + ',0)';
   }
  }
  
  
  beginTimer() {
   var dateStart = new Date();
   dateStart = dateStart.getTime(); 
   window.setInterval(() => this.countDownClock(dateStart, 60000), 500);
  }
  
  countDownClock(dateStart, timer) {

  this.timer = document.getElementById('timer')
  
   var d = new Date();
 
   window.intOffset = timer - (d.getTime() - dateStart);

   this.timer.textContent = (Math.ceil(window.intOffset / 1000));

   window.intAngle = 0.1048335 * 0.001 * window.intOffset;

   this.ctx.clearRect(0, 0, 400, 400);

   // Grey background ring
   this.ctx.beginPath();
   this.ctx.globalAlpha = 1;
   this.ctx.arc(150, 150, 140, 0, 6.283, false);
   this.ctx.arc(150, 150, 105, 6.283, ((Math.PI * 2)), true);
   this.ctx.fillStyle = "#bbb";
   this.ctx.fill();
   this.ctx.closePath();

   // Clock face ring
   this.ctx.beginPath();
   this.ctx.globalAlpha = 1;
   this.ctx.arc(150, 150, 140.1, -1.57, (-1.57 + window.intAngle), false);
   this.ctx.arc(150, 150, 105, (-1.57 + window.intAngle), ((Math.PI * 2) - 1.57), true);
   this.ctx.fillStyle = this.colourChanger(window.intAngle);
   this.ctx.fill();
   this.ctx.closePath();

   // Centre circle
   this.ctx.beginPath();
   this.ctx.arc(150, 150, 105, 0, 6.283, false);
   this.ctx.fillStyle = "#fff";
   this.ctx.fill();
   this.ctx.closePath();

    if (window.intOffset <= 0) // If time is up
     {this.timeUp()}
    else {
      // setTimeout("this.countDownClock(" + dateStart + "," + 60000 + ")", 50);
    }
  }
  
  
  
   timeUp(){
     this.clock.style.display='none'
     this.timer.style.display='none'
  
    //  alert('Time is up!')
  }

}

module.exports = Timer;
