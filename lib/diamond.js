class Diamond {

  constructor(colIdx, rowIdx, size, color){
    this.x = colIdx * 65 + 130 ; 
    this.y = rowIdx * 65 + 130;
    this.colIdx = colIdx;
    this.rowIdx = rowIdx
    this.size = size;
    this.color = color;
    this.exist = true;
  }

  drawDiamond(ctx){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }


  // drawDiamond(ctx) {
  //     const d = 65
  //     //Ruby's
  //     var x = 105; var y = 125;
  //     var w = 55; var h = 50;
  //     let colors = ['#E3170D', '#9D1309', '#F22C1E'];
  //     this.sketch(x, y, w, h, ctx, colors);
  //     this.sketch(x+d, y, w, h, ctx, colors);
  //     this.sketch(x+2*d, y, w, h, ctx, colors);    
  // }

  // sketch(x, y, w, h, ctx, colors) {
  //   ctx.fillStyle = colors[0];
  //   ctx.beginPath();
  //   ctx.moveTo(x, y);
  //   ctx.lineTo(x + w / 2, y + 0.7 * h);
  //   ctx.lineTo(x + w / 2, y);
  //   ctx.fill();
  
  //   ctx.fillStyle = colors[1];
  //   ctx.beginPath();
  //   ctx.moveTo(x + w / 2, y);
  //   ctx.lineTo(x + w / 2, y + 0.7 * h);
  //   ctx.lineTo(x + w, y);
  //   ctx.fill();
  
  //   // Upper left triangle
  //   ctx.beginPath();
  //   ctx.moveTo(x + w / 4, y - 0.3 * h);
  //   ctx.lineTo(x, y);
  //   ctx.lineTo(x + w / 2, y);
  //   ctx.fill();
  
  //   // centre inverted triangle
  //   ctx.fillStyle = colors[2];
  //   ctx.beginPath();
  //   ctx.moveTo(x + w / 4, y - 0.3 * h);
  //   ctx.lineTo(x + w / 2, y);
  //   ctx.lineTo(x + 0.75 * w, y - 0.3 * h);
  //   ctx.fill();
  
  //   //Upper left triangle.
  //   ctx.fillStyle = colors[0];
  //   ctx.beginPath();
  //   ctx.moveTo(x + 0.75 * w, y - 0.3 * h);
  //   ctx.lineTo(x + w / 2, y);
  //   ctx.lineTo(x + w, y);
  //   ctx.fill();
  
  // }
}

module.exports = Diamond


// //Saphires's
// var x = 300; var y = 100;
// var w = 200; var h = 200;
// colors = ['#3366CC', '#003399', '#333399'];
// sketch(x, y, w, h, ctx, colors);

// //Emerald's
// var x = 500; var y = 100;
// var w = 200; var h = 200;
// colors = ['#4BB74C', '#517B58', '#5B9C64'];
// sketch(x, y, w, h, ctx, colors);