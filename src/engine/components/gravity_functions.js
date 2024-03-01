



"use strict"

import * as gravity from "./gravity.js"
import engine from "../index.js";


function findDirection(direction){
    //base direction around a circle
    direction = direction % gravity.getSystemDirections();
    let angleDegrees = 360.0/gravity.getSystemDirections();
    
    //turn it into radians and return
    return (direction*angleDegrees+gravity.getDefaultDirection()) * (Math.pi/180);
}
function generateParticles(){
    //Big O of directions*density^2 
    let particleSet = new engine.GravityParticleSet();
    let bounds = gravity.getSystemBounds();
    let density = gravity.getDensity();
    let directions = gravity.getSystemDirections();
    //bounds[x,y,x2,y2]
    /*
    for density 3 with bounds [1,1,2,2]
    x = 1 + ((2-1)/(3-1) * 0,1,2)
    x = 1 + 0
    x = 1 + 0.5
    x = 1 + 1
    */
    for(let i=0; i<density; i++){
        // x = leftmost point + (rightmost - leftmost)/(density-1) * this emitter's position
        let x = bounds[0]+(((bounds[2]-bounds[0])/(density-1))*i);
        for(let j=0; j<density; j++){
            // y = bottommost point + (topmost-bottommost)/(density-1) * this emitter's position
            let y = bounds[1]+(((bounds[3]-bounds[1])/(density-1))*i);
            for(let k = 0; k<directions; k++){
                //addEmitterAt(x,y, numParticlesPerEmitter, perpetual, direction)
                particleSet.addEmitterAt(x,y, 5, true, k);
            }
        }
    }

    return particleSet;
}

export {
    //math function finding a direction
    findDirection,
    //core function to create particles from the gravity system
    generateParticles

}