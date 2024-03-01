/*
 * File: gravity_renderable.js
 *  
 * Renderables that get affected by gravity
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import SpriteRenderable from "./sprite_renderable.js";
import engine from "../../engine/index.js";

class GravityRenderable extends SpriteRenderable {
    constructor(myTexture, gravityBool, mass)
    {
        super(myTexture);
        this.gravitating = gravityBool;
        this.mass = mass;
        this.speed = engine.gravity.getSystemSpeed();
        this.currentDirection = engine.gravity.getDefaultDirection(); // what should we assign for default direction?

        // velocity is speed * cos(direction) for x, sin(direction) for y
        this.currentVelocityX = this.speed * Math.cos(this.currentDirection);
        this.currentVelocityY = this.speed * Math.sin(this.currentDirection);
    }

    isGravitating()
    {
        return this.gravitating;
    }

    gravitate(gravityBool)
    {
        this.gravitating = gravityBool;
    }

    getVelocity()
    {
        return [this.currentVelocityX, this.currentVelocityY];
    }
}

export default GravityRenderable