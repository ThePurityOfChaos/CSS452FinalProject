/*
 * File: gravity_renderable.js
 *  
 * Renderables that get affected by gravity
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import SpriteRenderable from "./sprite_renderable.js";
import engine from "../../engine/index.js";
import BoundingBox from "../utils/bounding_box.js";

class GravityRenderable extends SpriteRenderable {
    constructor(myTexture, gravityBool, mass){
        super(myTexture);
        this.gravitating = gravityBool;
        this.mass = mass;
        this.speed = 0;
        this.currentDirection = engine.gravity.getDefaultDirection();
        this.slowColorChange = 0;
        this.slowAmount = 10;
        this.redChange = 0.0;
        this.greenChange = 0.0;
        this.blueChange = 0.0;
        this.modularChange = false;
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
    setColorChanging(r,g,b){
        this.redChange = r;
        this.greenChange = g;
        this.blueChange = b;
    }


    collide(gravParticle){
        let bounds = new BoundingBox(this.mXform.getPosition(),this.mXform.getWidth(),this.mXform.getHeight());
        let gpPos = gravParticle.getPosition();
        return bounds.containsPoint(gpPos[0],gpPos[1]);
    }

    resolveCollision(gravParticle){
        // if we are planning to have different gravity particle sets with varying gravity force etc. 
        // we have to store the velocity and direction values in individual particles
        // for now I am using the gravity.js values

        let particleForce = gravParticle.getForce();

        // we should definetely store the particle's direction in the particle class
        // this is not what we should have, I am just writing this line as a filler
        let particleDirection = gravParticle.getDirection();

        let maxForce = gravParticle.getMaxForce();

        // velocity is speed * cos(direction) for x, sin(direction) for y
        if(this.slowColorChange == 0){
            let color = this.getColor();
            if(this.modularChange)
            this.setColor([(color[0]+this.redChange)%1,(color[1]+this.greenChange)%1,(color[2]+this.blueChange)%1,color[3]]);
            else
            this.setColor([(color[0]+this.redChange),(color[1]+this.greenChange),(color[2]+this.blueChange),color[3]]);
        }
        this.slowColorChange = (this.slowColorChange + 1) % this.slowAmount;

        //would this increase the velocity beyond the maximum allowed by the particle? OR would this slow down the renderable?
        if(Math.abs(this.currentVelocityX + particleForce * Math.cos(particleDirection))<maxForce || Math.abs(this.currentVelocityX) > Math.abs(this.currentVelocityX + particleForce * Math.cos(particleDirection))){
            this.currentVelocityX = this.currentVelocityX + particleForce * Math.cos(particleDirection);
        }
        if(Math.abs(this.currentVelocityY + particleForce * Math.sin(particleDirection))<maxForce || Math.abs(this.currentVelocityY) > Math.abs(this.currentVelocityY + particleForce * Math.sin(particleDirection))){
            this.currentVelocityY = this.currentVelocityY + particleForce * Math.sin(particleDirection);
        }
    }

    update(){
        
        if(this.currentVelocityX != 0 || this.currentVelocityY != 0){
            // might change this to lerp to make it look better

            // changing the x-value if the object didn't hit the ground yet (it doesn't know about ground, though?)
            this.mXform.incXPosBy(this.currentVelocityX);
            

            // changing the y-value if the ground is not hit or if the ground is hit but the velocity is positive
            
            this.mXform.incYPosBy(this.currentVelocityY);
            

            if(engine.gravity.isModularSpace()){
                let location = engine.gravity_functions.modularize(this.mXform.getXPos(),this.mXform.getYPos());
                this.mXform.setXPos(location[0]);
                this.mXform.setYPos(location[1]);
            }
            else{
                let bounds = engine.gravity.getSystemBounds();
                let location = [this.mXform.getXPos(),this.mXform.getYPos()];
                if(location[0] <= bounds[0] || location [0] >= bounds[2]){
                    this.mXform.setXPos(location[0]<=bounds[0]?
                    bounds[0]:bounds[2]);
                    this.currentVelocityX = 0;
                }
                if(location[1] <= bounds[1] || location [1] >= bounds[3]){
                    this.mXform.setYPos(location[1]<=bounds[1]?
                        bounds[1]:bounds[3]);
                    this.currentVelocityY = 0;
                }
            }
        }
    }
}

export default GravityRenderable;