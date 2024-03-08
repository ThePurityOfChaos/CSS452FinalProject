/*
 * File: gravity_renderable.js
 *  
 * Renderables that get affected by gravity
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import SpriteRenderable from "./sprite_renderable.js";
import engine from "../../engine/index.js";

class GravityRenderable extends SpriteRenderable {
    constructor(myTexture, gravityBool, mass){
        super(myTexture);
        this.gravitating = gravityBool;
        this.mass = mass;
        this.speed = 0;
        this.currentDirection = engine.gravity.getDefaultDirection();

        this.currentVelocityX = 0;
        this.currentVelocityY = 0;
    }

    isGravitating(){
        return this.gravitating;
    }

    gravitate(gravityBool){
        this.gravitating = gravityBool;
    }

    getVelocity(){
        return [this.currentVelocityX, this.currentVelocityY];
    }

    setVelocity(velocity){
        this.currentVelocityX = velocity[0];
        this.currentVelocityY = velocity[1];
    }

    setSpeed(speed){
        this.speed = speed;
    }

    collision(gravParticle){
        // if we are planning to have different gravity particle sets with varying gravity force etc. 
        // we have to store the velocity and direction values in individual particles
        // for now I am using the gravity.js values

        if(false){

        let particleSpeed = gravParticle.getForce();

        // we should definetely store the particle's direction in the particle class
        // this is not what we should have, I am just writing this line as a filler
        let particleDirection = gravParticle.getDirection();

        // velocity is speed * cos(direction) for x, sin(direction) for y
        this.currentVelocityX = this.currentVelocityX + particleSpeed * Math.cos(particleDirection);
        this.currentVelocityY = this.currentVelocityY + particleSpeed * Math.sin(particleDirection);
        }
    }

    update(){
        if(this.speed > 0){
            // might change this to lerp to make it look better

            // changing the x-value if the object didn't hit the ground yet
            this.mXform.incXPosBy(this.currentVelocityX);

            // changing the y-value if the ground is not hit or if the ground is hit but the velocity is positive
            if(this.mXform.getYPos() <= 7){
                if(this.currentVelocityY > 0){
                    this.mXform.incYPosBy(this.currentVelocityY);
                }
            }
            else{
                this.mXform.incYPosBy(this.currentVelocityY);
            }

            // resetting values to zero after repositioning
            this.speed = 0;
            this.currentVelocityX = 0;
            this.currentVelocityY = 0;
        }
    }
}

export default GravityRenderable