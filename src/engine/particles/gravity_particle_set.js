"use strict"

import GravityEmitter from "./gravity_emitter.js";
import ParticleSet from "./particle_set.js";

class GravityParticleSet extends ParticleSet{

    addEmitterAt(x, y, n, perpetual, direction) {
        let e;
        arguments.length>5?e = new GravityEmitter(x, y, n, perpetual, direction,arguments[5]):e = new GravityEmitter(x, y, n, perpetual, direction);
        this.mEmitterSet.push(e);
    }
    getEmitterAt(index){
        return this.mEmitterSet[index];
    }
    update(){
        super.update();
    }
}
export default GravityParticleSet;