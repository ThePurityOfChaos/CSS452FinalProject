"use strict"

import GravityEmitter from "./gravity_emitter.js";

class GravityParticleSet extends ParticleSet{

    addEmitterAt(x, y, n, perpetual, direction) {
        let e = new GravityEmitter(x, y, n, perpetual, direction);
        this.mEmitterSet.push(e);
    }
}
export default GravityParticleSet;