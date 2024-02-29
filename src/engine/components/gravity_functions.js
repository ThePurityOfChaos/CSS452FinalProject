



"use strict"

import * as gravity from "./gravity.js"


function findDirection(direction){
    //base direction around a circle
    direction = direction % gravity.getSystemDirections();
    let angleDegrees = 360.0/gravity.getSystemDirections();
    
    //turn it into radians

    return (direction*angleDegrees+gravity.getDefaultDirection()) * (Math.pi/180);
}

export {
    //math function finding a direction
    findDirection
}