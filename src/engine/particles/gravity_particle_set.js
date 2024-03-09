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
    //only does special updates if given a ObjSet containing objects with gravity_renderables as their mRenderComponent
    update(){
        super.update();
        if(arguments.length>0){
            for(let i=0; i<this.mSet.length; i++){
                for(let j=0; j<arguments[0].mSet.length; j++){
                    this.mSet[i].collide(arguments[0].mSet[j].mRenderComponent);
                    if(this.mSet[i].wasColliding(arguments[0].mSet[j].mRenderComponent)){
                        arguments[0].mSet[j].mRenderComponent.resolveCollision(this.mSet[i]);
                    }
                }

            }
        }
    }
}
export default GravityParticleSet;