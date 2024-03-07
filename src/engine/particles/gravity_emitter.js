



"use strict"

import ParticleEmitter from "./particle_emitter.js";
import * as gravity from "../components/gravity.js";
import * as gravity_functions from "../components/gravity_functions.js";

class GravityEmitter extends ParticleEmitter{
    
    constructor(px, py, num, perpetual, direction){
        super(px,py,num,gravity.creatorFunc);
        this.perpetual = perpetual;
        if(this.perpetual)
        this.baseNum = num;
        this.kMinToEmit = 1;
        this.direction = direction;
        arguments.length>5?this.speed = arguments[5]:this.speed = gravity.getGravityForce();
    }

    emitParticles(pSet){
        let numToEmit = 0;
        if (this.mNumRemains < this.kMinToEmit) {
            numToEmit = this.mNumRemains;
        } else {
            // 
            numToEmit = 1;
        }
        // Left for future emitting.                            
        this.mNumRemains -= numToEmit;
        let i, p;
        for (i = 0; i < numToEmit; i++) {
            p = this.mParticleCreator(this.mEmitPosition[0], this.mEmitPosition[1],this.direction, this.speed);
            pSet.addToSet(p);
        }
        if(this.perpetual)
        this.mNumRemains = this.baseNum;
    }
    move(dx,dy){
        this.mEmitPosition[0]=this.mEmitPosition[0]+dx;
        this.mEmitPosition[1]=this.mEmitPosition[1]+dy;
        if(gravity.isModularSpace()){
        [this.mEmitPosition[0],this.mEmitPosition[1]]= gravity_functions.modularize(this.mEmitPosition[0],this.mEmitPosition[1]);
        }
    }

 
}
export default GravityEmitter;