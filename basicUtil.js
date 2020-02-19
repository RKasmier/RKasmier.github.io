

function dist(x1, y1, x2, y2){
	return Math.pow((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1), 1/2);
}

function getDirection(x1, y1, x2, y2){
	//fix?
	distance = dist(x1, y1, x2, y2);
	combinedY = y2 - y1;
	combinedX = x2 - x1;
	
	switch(combinedY){
		case Math.abs(combinedY) : return Math.acos(combinedX / distance);
			break;
		case -Math.abs(combinedY) : return -Math.acos(combinedX / distance);
			break;
	}
		return;
}

class Graphics{
	constructor(canvas){
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
	}
	
	fillStyle(color){
		this.ctx.fillStyle = color;
	}
	strokeStyle(color){
		this.ctx.strokeStyle = color;
	}
	
	rect(x, y, w, h){
		this.ctx.fillRect(x, y, w, h);
		this.ctx.strokeRect(x, y, w, h);
	}
	
	drawEllipse(x, y, r){
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, Math.PI*2);
		this.ctx.closePath();
		this.ctx.stroke();
	}
	
	fillEllipse(x, y, r){
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, Math.PI*2);
		this.ctx.closePath();
		this.ctx.fill();
	}
	
	line(x1, y1, x2, y2){
		this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.closePath();
		this.ctx.stroke();
	}
	
	strokeWeight(weight){
		this.ctx.lineWidth = weight;
	}
	
	background(color){
		this.ctx.fillStyle = color;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}
	
	
	
}


class Vector{
	
	constructor(x, y, mag, dir){
		this.x = x;
		this.y = y;
		this.mag = mag;
		this.dir = dir;
	}
	
	setMag(mag){
		this.mag = mag;
		
		this.x = this.mag * Math.cos(this.dir);
		this.y = this.mag * Math.sin(this.dir);
	}
	
	setDir(dir){
		this.dir = dir;
		
		this.x = this.mag * Math.cos(this.dir);
		this.y = this.mag * Math.sin(this.dir);
	}
	
	setX(x){
		this.x = x;
		
		this.mag = Math.pow(this.x * this.x + this.y * this.y, 1/2);
		switch(this.y){
			case Math.abs(this.y):
				this.dir = Math.acos(this.x / this.mag);
			break;
			case -Math.abs(this.y):
				this.dir = -Math.acos(this.x / this.mag);
			break;
		}
	}
	
	setY(y){
		this.y = y;
		
		this.mag = Math.pow(this.x * this.x + this.y * this.y, 1/2);
		switch(this.y){
			case Math.abs(this.y):
				this.dir = Math.acos(this.x / this.mag);
			break;
			case -Math.abs(this.y):
				this.dir = -Math.acos(this.x / this.mag);
			break;
		}
	}
	
	add(vector){
		//Fix - Very Inefficient
		this.vector = vector;
		this.newX = this.x + this.vector.x;
		this.newY = this.y + this.vector.y;
		//this.newMag = (this.vector.mag + this.mag);
		//this.newDir = (this.vector.dir + this.dir)/2;
		
		this.newMag = Math.pow(this.newX * this.newX + this.newY * this.newY, 1/2);
		switch(this.newY){
			case Math.abs(this.newY):
				this.newDir = Math.acos(this.newX / this.newMag);
			break;
			case -Math.abs(this.newY):
				this.newDir = -Math.acos(this.newX / this.newMag);
			break;
		}
		//this.newX = this.newMag * Math.cos(this.newDir);
		//this.newY = this.newMag * Math.sin(this.newDir);
		
		return new Vector(this.newX, this.newY, this.newMag, this.newDir);
	}
	
}
function createVector(type, a, b){
	//type can equal MD or XY for Magnitude and Direction or X component Vector and Y component Vector
	if(type!="MD" && type!="XY"){
		console.log("Vector Type Not Specified");
		return;
	}
	
	switch(type){
		case "MD" :
			m = a;
			d = b;
			x = m * Math.cos(d);
			y = m * Math.sin(d);
		break;
		case "XY" :
			x = a;
			y = b;
			m = Math.pow(x * x + y * y, 1/2);
			absY = Math.abs(y);
			switch(y){
				case absY:
					d = Math.acos(x / m);
					break;
				case -absY:
					d = -Math.acos(x / m);
					break;
			}
		break;
	}
	
	return new Vector(x, y, m, d);
	
}
