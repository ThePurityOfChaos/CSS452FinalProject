/*
 *    Gravity Gun Game Runner Object
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";
import GravitatingObject from "./gravitating_object.js";

class GGRunner extends GravitatingObject {

    constructor(spriteTexture, atX, atY, size, gravitating, mass){
        super(spriteTexture, atX, atY, size, gravitating, mass);

        this.kWASDDelta = 3;
        this.isJumping = false;
        this.currVal = 0;
        this.finalPos = 0;
        this.counter =  0;
        this.currSpeedX = 0;
        this.currSpeedY = 0;
    }

    update(){
        super.update();
        let xform = this.getXform();

        // if the character isn't jumping, give the use the opportunity to move it or jump it again
        if(!this.isJumping){
            if (engine.input.isKeyPressed(engine.input.keys.Five)) {
                this.currSpeedY = 4;
                this.currSpeedX = 2;
                this.isJumping = true;
            }
            if (engine.input.isKeyPressed(engine.input.keys.A)) {
                xform.incXPosBy(-(this.kWASDDelta));
            }
            if (engine.input.isKeyPressed(engine.input.keys.D)) {
                xform.incXPosBy(this.kWASDDelta);
            }
    
        }
        else{
            if(this.counter < 30){
                xform.incXPosBy(this.currSpeedX);
                xform.incYPosBy(this.currSpeedY);
                this.currSpeedX /= 2;
                this.currSpeedY /= 2;
            }
            else{
                xform.incXPosBy(this.currSpeedX);
                xform.incYPosBy(this.currSpeedY * -1);
                this.currSpeedX *= 2;
                this.currSpeedY *= 2;
            }

            if(this.counter >= 60) { 
                this.isJumping = false; 
                this.counter = 0;
            }

            this.counter++;
        }


    }
}

export default GGRunner;
