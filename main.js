
window.onload=function(){
  canv = document.getElementById("canvas");
  ctx = canv.getContext("2d");
  
  setInterval(main, 1000/120);
  
}


function main(){
  ctx.fillStyle = "white";
   ctx.fillRect(0,0, canv.width, canv.height);
  ctx.fillStyle = "black";
  
  ctx.fillRect(100, 100, 200, 200);
   
  /*if(x>canv.width-25 || x<25){
     xv *= -1;
     }
   if(y>canv.height || y<25){
     yv *= -1;
   }
  x+=xv;
  y+=yv;*/
}
