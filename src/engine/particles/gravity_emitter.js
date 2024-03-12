



"use strict"

import ParticleEmitter from "./particle_emitter.js";
import * as gravity from "../components/gravity.js";
import * as gravity_functions from "../components/gravity_functions.js";

class GravityEmitter extends ParticleEmitter{
    
    constructor(px, py, num, perpetual, direction){
        super(px,py,num,gravity.creatorFunc);
        //will it refresh the number to emit?
        this.perpetual = perpetual;
        //store the amount to refresh to
        if(this.perpetual)
        this.baseNum = num;
        //all gravity emitters only emit a single particle per update
        this.kMinToEmit = 1;
        //direction is stored as float
        this.direction = direction;
        //start and end colors, self-explanatory
        this.startColor = gravity.getParticleStartColor();
        this.endColor = gravity.getParticleEndColor();


        //overloaded functions
        //particle speed
        arguments.length>5?this.speed = arguments[5]:this.speed = null;
        //particle force
        arguments.length>6?this.force = arguments[6]:this.force = null;
        //particle max force (>= force)
        arguments.length>7?this.mMaxForce = arguments[7]:this.mMaxForce = null;
    }
    //changes the colors of the system
    setColors(startColor,endColor){
        this.startColor = startColor;
        this.endColor = endColor;
    }

    emitParticles(pSet){
        let numToEmit = 0;
        if (this.mNumRemains < this.kMinToEmit) {
            numToEmit = this.mNumRemains;
        } else {
            //emit only once
            numToEmit = 1;
        }
        // Left for future emitting.                            
        this.mNumRemains -= numToEmit;
        let i, p;
        //garbage code
        for (i = 0; i < numToEmit; i++) {
            p = this.mParticleCreator(this.mEmitPosition[0], this.mEmitPosition[1],this.direction, 
                this.speed!=null?this.speed:gravity.getSystemSpeed(), 
                this.force!=null?this.force:gravity.getGravityForce(), 
                this.mMaxForce!=null?this.mMaxForce:gravity.getMaxForce(), 
                this.startColor, this.endColor);
            pSet.addToSet(p);
        }
        if(this.perpetual)
        this.mNumRemains = this.baseNum;
    }
    //move the emitter
    move(dx,dy){
        this.mEmitPosition[0]=this.mEmitPosition[0]+dx;
        this.mEmitPosition[1]=this.mEmitPosition[1]+dy;
        // wrap around if the space is modular
        if(gravity.isModularSpace()){
        [this.mEmitPosition[0],this.mEmitPosition[1]]= gravity_functions.modularize(this.mEmitPosition[0],this.mEmitPosition[1]);
        }
    }

 
}
export default GravityEmitter;