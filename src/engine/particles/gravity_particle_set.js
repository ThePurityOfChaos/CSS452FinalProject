"use strict"

import GravityEmitter from "./gravity_emitter.js";
import ParticleSet from "./particle_set.js";

class GravityParticleSet extends ParticleSet{

    addEmitterAt(x, y, n, perpetual, direction) {
        let e;
        //speed, force, max force
        arguments.length>7?e= new GravityEmitter(x,y,n,perpetual,direction,arguments[5],arguments[6],arguments[7]):
        //speed, force
        arguments.length>6?e= new GravityEmitter(x,y,n,perpetual,direction,arguments[5],arguments[6]):
        //speed
        arguments.length>5?e = new GravityEmitter(x, y, n, perpetual, direction,arguments[5]):
        //standard
        e = new GravityEmitter(x, y, n, perpetual, direction);
        this.mEmitterSet.push(e);
    }
    getEmitterAt(index){
        return this.mEmitterSet[index];
    }
    //only does special updates if given a ObjSet containing objects with gravity_renderables as their mRenderComponent
    update(){
        super.update();
        //overloaded functionality
        if(arguments.length>0){
            //for all particles
            for(let i=0; i<this.mSet.length; i++){
                //for all gravity objects
                for(let j=0; j<arguments[0].mSet.length; j++){
                    //detect & resolve collisions or lack thereof
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