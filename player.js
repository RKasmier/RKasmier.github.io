class Player{
	
	constructor(x, y){
		
		this.position = createVector("XY", x, y);
		
		this.r = 15;
		this.width = this.r * 2;
		this.height = this.r * 2;
		
		
		this.angle = 0;
		
		this.graphics;
			
		this.velocity = createVector("XY", 0, 0);
		
		this.FList = [];
		this.totalForce = createVector("MD", 0, 0);
		this.Fnet = createVector("MD", 0, 0);
		
		this.jetPackMode = true;
		this.jetPackAcc = 0.2;
		this.maxJetPackSpeed = 3;
		this.inPlanetRange = false;
		this.jetPackForce = createVector("MD", this.jetPackAcc, 0);
		
		this.jumpAcc = 5;
		this.jumpDir = 0;
		this.jumpForce = createVector("MD", this.jumpAcc, this.jumpDir);
		
		this.inRangeAcc = 0.5;
		this.maxInRangeSpeed = 6;
		
		this.groundAcc = 2;
		this.maxGroundSpeed = 3;
		
		this.inRange = false;
		
		this.onGround = false;
		this.timeOnGround = 0;
		
		this.spaceShipImg = new Image();
		this.spaceShipImg.src = "./sprites/small spaceship.png";
		
	}
	
	show(graphics){
		if(graphics == null){
			console.log("no graphics for player");
			return;
		}
		
		this.graphics = graphics;
		
		this.graphics.ctx.save();
		this.graphics.ctx.translate(this.position.x, this.position.y);
		this.graphics.ctx.rotate(this.angle);
		/*remove eventually
		switch(this.jetPackMode){
			case true:
			this.graphics.fillStyle("red");
			break;
			case false: 
			this.graphics.fillStyle("blue");
			break;
		}
		//*/
		//this.graphics.strokeStyle("black");
		//this.graphics.strokeWeight(2);
		//this.graphics.rect(0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
		//this.graphics.fillEllipse(0, 0, this.r);
		//this.graphics.drawEllipse(0, 0, this.r);
		this.graphics.ctx.drawImage(this.spaceShipImg, 0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
		
		this.graphics.ctx.restore();
		
		
	}
	
	endOfUpdate(){
		this.FList.splice(0, this.FList.length);
		this.totalForce = createVector("MD", 0, 0);
		//this.jetPackMode = true;
		//this.inPlanetRange = false;
	}
	
	update(){
		
		if(this.FList.length!=0){
			for(this.i=0; this.i<this.FList.length; this.i++){
				this.totalForce = this.totalForce.add(this.FList[this.i]);
			}
		}
		
		
		this.Fnet = this.totalForce;
		
		this.velocity = this.velocity.add(this.Fnet);
		
		this.position = this.position.add(this.velocity);
		//this.x = this.position.x;
		//this.y = this.position.y;
		
		this.angle=this.velocity.dir;
		
	}
	
	
	addForce(vector){
		this.FList.push(vector);
	}
	
	removeForce(n){
		this.FList.splice(n, n+1);
	}
	
	moveLeft(){
		if(this.jetPackMode){
			if(this.velocity.x >= -this.maxJetPackSpeed){
				this.jetPackForce.setDir(Math.PI);
				this.FList.push(this.jetPackForce);
			}
			return;
		}
		
		//when on ground
		if(this.onGround){
			if(this.velocity.mag < this.maxGroundSpeed){
				this.FList.push(createVector("MD", this.groundAcc, this.jumpDir - Math.PI/2));
			}
			return;
		}
		
		//when in a Gravity Range
		if(this.velocity.mag < this.maxInRangeSpeed){
			this.FList.push(createVector("MD", this.inRangeAcc, this.jumpDir - Math.PI/2));
		}
	}
	
	moveRight(){
		if(this.jetPackMode){
			if(this.velocity.x <= this.maxJetPackSpeed){
				this.jetPackForce.setDir(0);
				this.FList.push(this.jetPackForce);
			}
			return;
		}
		
		//when on ground
		if(this.onGround){
			if(this.velocity.mag < this.maxGroundSpeed){
				this.FList.push(createVector("MD", this.groundAcc, this.jumpDir + Math.PI/2));
			}
			return;
		}
		
		//when in a Gravity Range
		if(this.velocity.mag < this.maxInRangeSpeed){
			this.FList.push(createVector("MD", this.inRangeAcc, this.jumpDir + Math.PI/2));
		}
	}
	
	moveUp(){
		if(this.velocity.y >= -this.maxJetPackSpeed && this.jetPackMode){
			this.jetPackForce.setDir(3*Math.PI/2);
			this.FList.push(this.jetPackForce);
		}
	}
	
	moveDown(){
		if(this.velocity.y <= this.maxJetPackSpeed && this.jetPackMode){
				this.jetPackForce.setDir(Math.PI/2);
				this.FList.push(this.jetPackForce);
		}
	}
	
	jump(){
		if(this.onGround){
			this.jumpForce.setDir(this.jumpDir);
			this.FList.push(this.jumpForce);
			
		}
		//console.log(this.jumpForce);
	}
	
}