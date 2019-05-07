
window.onload=function(){
  canv = document.getElementById("canvas");
  ctx = canv.getContext("2d");
  
  setInterval(main, 1000/120);
  
}

function main(){
  ctx.fillStyle = "black";
   ctx.fillRect(0,0, canv.width, canv.height);
  
}
