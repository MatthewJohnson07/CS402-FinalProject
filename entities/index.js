import Matter from "matter-js"
import Character from "../components/Character";

export default restart => {
	let engine = Matter.Engine.create({enableSleeping: false})
	
	let world = engine.world
	
	world.gravity.y = 0;
	
	return {
		physics: {engine, world},
		Character: Character(world, 'green', {x: 50, y: 200}, {height: 40, width: 40})
	}
}
