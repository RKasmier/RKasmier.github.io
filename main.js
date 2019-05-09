var x = 50;
var y = 100;
var vx = 2;
var vy = 0;
var posX;
var posY;

window.onload=function(){
  canv = document.getElementById("canvas");
  ctx = canv.getContext("2d");
  document.addKeyListener("mousedown", mousePressed);
  setInterval(main, 1000/60);
  
}


function main(){
  ctx.fillStyle = "white";
   ctx.fillRect(0,0, canv.width, canv.height);
  ctx.fillStyle = "black";
  
  ctx.fillRect(x, y, 50, 50);
   
  if(x>canv.width-50 || x<50){
     vx *= -1;
  }
  
  x+=vx;
}


function mousePressed(event){
      posX = event.clientX;
      posY = event.clientY;
      vx *= -1;
  
      alert(posX + ", " + posY);
}
