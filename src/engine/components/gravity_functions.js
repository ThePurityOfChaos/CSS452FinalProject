



"use strict"

import * as gravity from "./gravity.js"
import GravityParticleSet from "../particles/gravity_particle_set.js";


function findDirection(direction){
    //base direction around a circle
    let sysDir = gravity.getSystemDirections();
    direction = direction % sysDir;
    let angleDegrees = 360.0/sysDir;
    //turn it into radians and return, thanks WikiHow! (https://www.wikihow.com/Convert-Degrees-to-Radians)
    return (direction*angleDegrees+gravity.getDefaultDirection()) * (Math.PI/180);
}
function modularize(x,y){
    //modularize the position: subtract the lower bound from the position, modulzrize, and add it back at the end.
    //apparently Javascript has a bug where negative number modulus positive numbers return negative numbers, 
    //so this is way more complex than it should have been
    let bounds = gravity.getSystemBounds();
        x = ((x-bounds[0])%(bounds[2]-bounds[0])+(bounds[2]-bounds[0]))%(bounds[2]-bounds[0])+bounds[0];
        y = ((y-bounds[1])%(bounds[3]-bounds[1])+(bounds[3]-bounds[1]))%(bounds[3]-bounds[1])+bounds[1];
    return [x,y];
}
//Not actually necessary, essentially just a fancy preset.
function generateParticles(){
    //Big O of directions*density^2 
    let particleSet = new GravityParticleSet();
    let bounds = gravity.getSystemBounds();
    let density = gravity.getDensity();
    let directions = gravity.getSystemDirections();
    let randomizeParticles = gravity.getRandomParticles();
    //bounds[x,y,x2,y2]
    /*
    for density 3 with bounds [1,1,2,2]
    x = 1 + ((2-1)/(3-1) * 0,1,2)
    x = 1 + 0
    x = 1 + 0.5
    x = 1 + 1
    */
    let x,y,i,j,k;
    for(i=0; i<density; i++){
        // x = leftmost point + (rightmost - leftmost)/(density-1) * this emitter's position
        x = bounds[0]+(((bounds[2]-bounds[0])/(density-1))*i);
        //if null, randomize
        if(randomizeParticles)
        x = null;
        for(j=0; j<density; j++){
            // y = bottommost point + (topmost-bottommost)/(density-1) * this emitter's position
            y = bounds[1]+(((bounds[3]-bounds[1])/(density-1))*j);
            //if null, randomize
            if(randomizeParticles)
            y = null;
            for(k = 0; k<directions; k++){
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
    //helper function to create particles from the gravity system
    generateParticles,
    //helper function to modularize based on the bounds
    modularize

}