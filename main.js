///To Do///
// 1. Figure out Why space ship teleports to 0,0 when in a planet (maybe something to do with divide by 0 (distance, or direction or magnitude adding to 0))
// 2. make controls more fluid
// 3. stop the ship from freaking out on the ground of planets

player = new Player(100, 50);

planetList = [];

collisionHander = new CollisionHandler(player, planetList);

function update(){


//background
g.background("black");



collisionHander.update(player, planetList);

for(i=0; i<planetList.length; i++){
	planetList[i].show(g);
}

player.show(g);
player.update();


player.endOfUpdate();
}


function keyDown(e){
	//console.log(e.keyCode);
	switch(e.keyCode){
		//Right
		case 39:
			player.moveRight();
		break;
		//Left
		case 37:
			player.moveLeft();
		break;
		//Up
		case 38:
			player.moveUp();
		break;
		//Down
		case 40:
			player.moveDown();
		break;
		//Space Bar
		case 32: 
			player.jump();	
		break;
	}
}


function mouseMoved(e){

	mouse = {
		x: e.clientX,
		y: e.clientY
	};

}


function mouseClicked(e){
	
	//console.log(e);
	planetList.push(new Planet(mouse.x, mouse.y, 40, 200, 0.2, 0.998));
	//planetList.push(new Planet(mouse.x, mouse.y, 1, 200, 0.2, 1));
	r1 = Math.random()*100;
	r2 = r1 + 10 + Math.random()*200; 
	r3 = Math.random()*0.5;
	//planetList.push(new Planet(mouse.x, mouse.y, r1, r2, r3, 0.998));
		
}