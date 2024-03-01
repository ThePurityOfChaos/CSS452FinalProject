/* File: gravitating_object.js
 *
 * objects that will be able to get affected by gravity
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";

class GravitatingObject extends engine.GameObject {
    constructor(spriteTexture, atX, atY, size, gravitating, mass) {
        super();
        this.mRenderComponent = new engine.GravityRenderable(spriteTexture, gravitating, mass);
        this.mRenderComponent.setColor([1, 1, 1, 0]);
        this.mRenderComponent.getXform().setPosition(atX, atY);
        this.mRenderComponent.getXform().setSize(size[0], size[1]);
        this.mRenderComponent.setElementPixelPositions(0, 120, 0, 180);

        // generating a rigid shape for this object 
        let r = new engine.RigidRectangle(this.getXform(), 3, 4);
        this.setRigidBody(r);
    }

    update()
    {
        // checking whether there are any collisions with a gravity particle OR if it's touching the ground
    }
}

export default GravitatingObject;