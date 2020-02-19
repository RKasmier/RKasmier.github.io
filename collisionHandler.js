class CollisionHandler{
	
	constructor(player, planetList){
		this.player = player;
		this.planetList = planetList;
			
			
		this.areColliding = function(p1, p1R, p2, p2R){
			this.distance = dist(p1.x, p1.y, p2.x, p2.y);
			return (this.distance < p1R + p2R);
		}
			
	}
	
	
	update(player, playerList){
		this.player = player;
		this.planetList = planetList;
		
		for(this.i=0; this.i<this.planetList.length; this.i++){
			this.planet = this.planetList[this.i];
			
			this.inGravitationalRange = this.areColliding(this.player.position, this.player.r, this.planet, this.planet.range);
			
				//when player is in gravitational range
			if(this.inGravitationalRange){
				this.planet.inPlayerRange = true;
				this.player.jetPackMode = false;
				
				
				this.planet.force.setDir(getDirection(this.player.position.x, this.player.position.y, this.planet.x, this.planet.y));
				this.player.addForce(this.planet.force);
				
				
				//Player Speed Decay when in gravitational range
				this.player.velocity.setMag(this.player.velocity.mag * this.planet.airResistance);
				
				this.inGroundRangeEntering = this.areColliding(this.player.position, this.player.r, this.planet, this.planet.r);
				this.inGroundRangeLeaving = this.areColliding(this.player.position, this.player.r-1, this.planet, this.planet.r);
				
				//when player is on ground
				if(this.inGroundRangeEntering && !this.player.onGround){
					this.player.onGround = true;
					
					//Change direction when hit ground
					if(this.player.velocity.dir>this.planet.force.dir){
						this.newDir = (2*this.player.velocity.dir) - (this.planet.force.dir) - Math.PI;
					} else if (this.player.velocity.dir<this.planet.force.dir){
						this.newDir = (2*this.planet.force.dir) - (this.player.velocity.dir) - Math.PI;
					} else {
						this.newDir = this.player.velocity.dir + Math.PI;
					}
					
					this.player.velocity.setDir(this.newDir);
					
					//velocity decay when hit ground
					if(this.player.velocity.mag <= 0.8){
						this.player.velocity.setMag(0);
					} else {
						this.player.velocity.setMag(this.player.velocity.mag * this.planet.groundResistance);
					}
					
					
				}
				
				if(!this.inGroundRangeLeaving && this.player.onGround){
					this.player.onGround = false;
					//console.log(this.player.onGround);
				}
				
				if(this.player.onGround){
					this.player.addForce(createVector("MD", this.planet.force.mag, this.planet.force.dir + Math.PI));
					
					//if player goes in the ground
					//this.player_planet_distance = dist(this.player.position.x, this.player.position.y, this.planet.x, this.planet.y);
					//this.player.position.setX(this.planet.r * Math.cos((this.player.position.x - this.planet.x) / (this.player_planet_distance + this.player.r)) + this.planet.x);
					//this.player.position.setY(this.planet.r * Math.sin((this.player.position.y - this.planet.y) / (this.player_planet_distance + this.player.r)) + this.planet.y);
					
				}
				
				this.player.jumpDir = this.planet.force.dir + Math.PI;
				
			}
				//when player leaves A gravitational range
			if(this.planet.inPlayerRange && !this.inGravitationalRange){
				this.planet.inPlayerRange = false;
				this.player.jetPackMode = true;
			}
					
				
				
				
				
					
				
				
			
		}
		//end of for loop
		
		
	}
	//end of update

	
	
}