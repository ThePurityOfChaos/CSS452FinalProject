



"use strict"

import Particle from "./particle.js";


class GravityParticle extends Particle{
    constructor(texture,x,y,life){
        super(texture,x,y,life);
        this.mAcceleration = 0;
        this.mDrag = 1;

    }
    getSize(){
        return 1;
    } 


}

export default GravityParticle;