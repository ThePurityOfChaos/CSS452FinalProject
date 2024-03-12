



"use strict"

import Particle from "./particle.js";
import * as gravity from "../components/gravity.js";
import * as gravity_functions from "../components/gravity_functions.js";


class GravityParticle extends Particle{
    constructor(texture,x,y,life){
        //prevents spawning outside the bounds
        if(gravity.isModularSpace()){
            [x,y]=gravity_functions.modularize(x,y);
        }
        //default values
        super(texture,x,y,life);
        this.mAcceleration = [0, 0];
        this.mDrag = 1;
        this.mForce = gravity.getGravityForce();
        this.mMaxForce = gravity.getMaxForce();
        this.direction = null;
        this.colliding = false;
    }
    //getters and setters
    getDirection(){
        return this.direction;
    }
    setDirection(direction){
        this.direction = direction;
    }
    getForce(){
        return this.mForce;
    }
    setForce(force){
        this.mForce = force;
    } 
    getMaxForce(){
        return this.mMaxForce;
    }
    setMaxForce(force){
        this.mMaxForce = force;
    }
    getPosition(){
        return this.mRenderComponent.getXform().getPosition();
    }
    //mark for deletion
    killParticle(){
        this.mCyclesToLive = -1;
    }
    //
    collide(gravObj){
        //use the gravObj's bounding box. Could probably be simplified with a getter / setter for this.colliding, but eh.
        if(gravObj.collide(this)){
            this.colliding = gravObj;
            return true;
        }
        return false;
    }
    wasColliding(gravObj){
        if(this.colliding == gravObj && !this.collide(gravObj)){
            this.colliding = false;
            //mass-based test, currently just assumes that all objects are of infinite mass. 
            if(true){
                this.killParticle();
            }
            return true;
        }
    }
    update(){
        super.update();

        if(gravity.isModularSpace()){
            let p=this.getPosition();
            [p[0],p[1]] = gravity_functions.modularize(p[0],p[1]);
            this.setPosition(p[0],p[1]);
        }
    }


}

export default GravityParticle;