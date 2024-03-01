"use strict"

import GravityEmitter from "./gravity_emitter.js";
import ParticleSet from "./particle_set.js";

class GravityParticleSet extends ParticleSet{

    addEmitterAt(x, y, n, perpetual, direction) {
        let e = new GravityEmitter(x, y, n, perpetual, direction);
        this.mEmitterSet.push(e);
    }
}
export default GravityParticleSet;