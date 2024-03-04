



"use strict"

import Particle from "./particle.js";
import * as gravity from "../components/gravity.js";
import * as gravity_functions from "../components/gravity_functions.js";


class GravityParticle extends Particle{
    constructor(texture,x,y,life){
        if(gravity.isModularSpace()){
            [x,y]=gravity_functions.modularize(x,y);
        }
        super(texture,x,y,life);
        this.mAcceleration = [0, 0];
        this.mDrag = 1;

    }
    getSize(){
        return 1;
    } 
    collide(){

    }
    update(){
        super.update();
        if(gravity.isModularSpace()){
        let bounds = gravity.getSystemBounds();
        let p=this.getPosition();
        //modularize the position: subtract the lower bound from the position, modulzrize, and add it back at the end.
        //apparently Javascript has a bug where negative number modulus positive numbers return negative numbers, 
        //so this is way more complex than it should have been
        p[0] = ((p[0]-bounds[0])%(bounds[2]-bounds[0])+(bounds[2]-bounds[0]))%(bounds[2]-bounds[0])+bounds[0];
        p[1] = ((p[1]-bounds[1])%(bounds[3]-bounds[1])+(bounds[3]-bounds[1]))%(bounds[3]-bounds[1])+bounds[1];
        this.setPosition(p[0],p[1]);
        }
    }


}

export default GravityParticle;