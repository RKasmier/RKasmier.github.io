class Planet{
	
	
	constructor(x, y, r, range, forceMag, airResistance){
		this.x = x;
		this.y = y;
		this.r = r;
		this.range = range;
		
		this.inPlayerRange = false;
		
		this.playerLockOn = false;
		
		this.forceMag = forceMag;
		
		this.airResistance = airResistance;
		
		this.groundResistance = 0.5;
		
		this.force = createVector("MD", this.forceMag, 0);
		
		this.planetImg = new Image();
		this.planetImg.src = "./sprites/asteroid.png";
		
	}
	
	
	show(graphics){
		
		
		if(graphics==undefined || graphics==null){
				console.log("no graphics");
				return;
		}
			//planet
			/*graphics.fillStyle("brown");
			graphics.fillEllipse(this.x, this.y, this.r);
			graphics.strokeStyle("green");
			graphics.strokeWeight(2);
			graphics.drawEllipse(this.x,this.y,this.r+2);*/
			
			graphics.ctx.drawImage(this.planetImg, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
			
			//gravitational field	
			graphics.strokeStyle("gray");
			graphics.strokeWeight(5);
			graphics.drawEllipse(this.x, this.y, this.range);
	}

	
	
}