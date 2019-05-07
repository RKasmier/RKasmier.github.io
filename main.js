
window.onload=function(){
  canv = document.getElementById("canvas");
  ctx = canv.getContext("2d");
  
  setInterval(main, 1000/120);
  
}

x=canv.width/2;
y=canv.height/2;
xv=yv=0;

xv = 5;
function main(){
  ctx.fillStyle = "black";
   ctx.fillRect(0,0, canv.width, canv.height);
  ctx.fillStyle = "white";
  
  ctx.fillEllipse(x, y, 25, 25);
   
  if(x>canv.width-25 || x<25){
     xv *= -1;
     }
   if(y>canv.height || y<25){
     yv *= -1;
   }
  x+=xv;
  y+=yv;
}
