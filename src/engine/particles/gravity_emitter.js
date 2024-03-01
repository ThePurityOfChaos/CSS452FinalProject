



"use strict"

import ParticleEmitter from "./particle_emitter.js";
import * as gravity from "../components/gravity.js";

class GravityEmitter extends ParticleEmitter{
    
    constructor(px, py, num, perpetual, direction){
        super(px,py,num,gravity.creatorFunc);
        this.perpetual = perpetual;
        if(this.perpetual)
        this.baseNum = num;
        this.kMinToEmit = 1;
        this.direction = direction;
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
            p = this.mParticleCreator(this.mEmitPosition[0], this.mEmitPosition[1],this.direction);
            pSet.addToSet(p);
        }
        if(this.perpetual)
        this.mNumRemains = this.baseNum;
    }

 
}
export default GravityEmitter;