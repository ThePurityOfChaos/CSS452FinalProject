/*
 * File: gravity_renderable.js
 *  
 * Renderables that get affected by gravity
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import * as SpriteRenderable from "./sprite_renderable";

class GravityRenderable extends SpriteRenderable {
    constructor(myTexture, gravityBool, mass)
    {
        super(myTexture);
        this.gravitating = gravityBool;
        this.mass = mass;
        this.currentVelocity = NaN; // what should we assign for default velocity?
        this.currentDirection = NaN; // what should we assign for default direction?
    }

    isGravitating()
    {
        return this.gravitating;
    }

    gravitate(gravityBool)
    {
        this.gravitating = gravityBool;
    }
}

export default GravityRenderable