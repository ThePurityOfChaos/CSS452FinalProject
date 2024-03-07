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

    collision(particle){
        // if we are planning to have different gravity particle sets with varying gravity force etc. 
        // we have to store the velocity and direction values in individual particles
        // for now I am using the gravity.js values
        this.speed = engine.gravity.getSystemSpeed();

        // we should definetely store the particle's direction in the particle class
        // this is not what we should have, I am just writing this line as a filler
        this.currentDirection = engine.gravity.getDefaultDirection();

        // velocity is speed * cos(direction) for x, sin(direction) for y
        this.currentVelocityX = this.currentVelocityX + this.speed * Math.cos(this.currentDirection);
        this.currentVelocityY = this.currentVelocityY + this.speed * Math.sin(this.currentDirection);
    }

    update(){
        if(this.speed > 0){
            // might change this to lerp to make it look better
            let xform = this.getXform();
            xform.incXPosBy(this.currentVelocityX);
            xform.incYPosBy(this.currentVelocityY);
            this.speed = 0;
        }
    }
}

export default GravityRenderable