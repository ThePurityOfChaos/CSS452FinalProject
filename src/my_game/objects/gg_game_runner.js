/*
 *    Gravity Gun Game Runner Object
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";
import GravitatingObject from "./gravitating_object.js";

class GGRunner extends GravitatingObject {

    constructor(spriteTexture, atX, atY, size, gravitating, mass){
        super(spriteTexture, atX, atY, size, gravitating, mass);

        this.kWASDDelta = 0.3;
        this.isJumping = false;
        this.currVal = 0;
        this.finalPos = 0;
        this.counter =  0;
        this.currSpeedY = 0;
        this.getRigidBody().setAcceleration(0,0);

        this.gameWon = false;
    }

    update(star){
        super.update();
        let xform = this.getXform();

        // if the character isn't jumping, give the use the opportunity to move it or jump it again
        if (engine.input.isKeyClicked(engine.input.keys.W)) {
            this.mRenderComponent.currentVelocityY = 0.2;
        }
        if (engine.input.isKeyClicked(engine.input.keys.S)) {
            this.mRenderComponent.currentVelocityY = -0.1;
        }
        if (engine.input.isKeyPressed(engine.input.keys.A)) {
            this.mRenderComponent.currentVelocityX -= 0.01;
        }
        if (engine.input.isKeyPressed(engine.input.keys.D)) {
            this.mRenderComponent.currentVelocityX += 0.01;
        }      
    }
}

export default GGRunner;
