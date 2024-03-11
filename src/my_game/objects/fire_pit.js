/*
 *   Fire Pit Object
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

import GameObject from "../../engine/game_objects/game_object.js";
import engine from "../../engine/index.js";
import GravitatingObject from "./gravitating_object.js";

class FirePit extends GameObject {
    constructor(texture, position, size, life){
        super(null);

        this.kDelta = 0.3;
        this.mRenderComponent = new engine.SpriteAnimateRenderable(texture);
        this.mRenderComponent.setColor([1, 1, 1, 0]);
        this.mRenderComponent.getXform().setPosition(position[0], position[1]);
        this.mRenderComponent.getXform().setSize(size[0], size[1]);
        this.mRenderComponent.setSpriteSequence(256, 0, 170.67, 256, 3, 0.01);
        this.mRenderComponent.setAnimationType(0);
        this.mRenderComponent.setAnimationSpeed(7);
        this.mRenderComponent._initAnimation();

        this.remainingLife = life;
        this.isVisible = true;
    }

    draw(camera){
        if(this.isVisible){
            this.mRenderComponent.draw(camera);
        }
    }

    update(){
        this.mRenderComponent.updateAnimation();
    }

}

export default FirePit;