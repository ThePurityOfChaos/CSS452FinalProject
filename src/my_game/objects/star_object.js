/* File: star_object.js 
 *
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";
import GameObject from "../../engine/game_objects/game_object.js";

class Star extends GameObject {
    constructor(spriteTexture, position, size) {
        super(null);
        this.kDelta = 0.3;
        this.mRenderComponent = new engine.SpriteAnimateRenderable(spriteTexture);
        this.mRenderComponent.setColor([1, 1, 1, 0]);
        this.mRenderComponent.getXform().setPosition(position[0], position[1]);
        this.mRenderComponent.getXform().setSize(5,10);
        this.mRenderComponent.setSpriteSequence(256, 1, 100, 256, 5, 0);
        this.mRenderComponent.setAnimationType(0);
        this.mRenderComponent.setAnimationSpeed(7);
        this.mRenderComponent._initAnimation();

        this.mRenderComponent2 = new engine.SpriteRenderable(spriteTexture);
        this.mRenderComponent2.setColor([1, 1, 1, 0]);
        this.mRenderComponent2.setElementPixelPositions(0, 512, 0, 256);
        this.mRenderComponent2.getXform().setPosition(position[0], position[1]);
        this.mRenderComponent2.getXform().setSize(size[0], size[1]);

        this.isVisible = true;

        // let r = new engine.RigidRectangle(this.getXform(), 3, 4);
        // this.setRigidBody(r);
        // this.toggleDrawRenderable();
        // this.toggleDrawRigidShape();
    }

    draw(camera){
        if(this.isVisible){
            this.mRenderComponent.draw(camera);
            // this.mRenderComponent2.draw(camera);
        }
    }

    update(){
        this.mRenderComponent.updateAnimation();
    }

}

export default Star;