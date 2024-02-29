
import * as gravity from "./gravity.js"


function findDirection(direction){
    direction = direction % gravity.getSystemDirections();
    let angle = 360.0/gravity.getSystemDirections();
    return direction*angle+gravity.getDefaultDirection();
}

export {
    //math function finding a direction
    findDirection
}