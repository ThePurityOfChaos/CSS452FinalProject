/*
 * File: MyGame.js 
 *       This is the logic of our game. 
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";
import Hero from "./objects/hero.js";
import Minion from "./objects/minion.js";
import GravitatingObject from "./objects/gravitating_object.js";

class MyGame extends engine.Scene {
    constructor() {
        super();
        this.kMinionSprite = "assets/minion_sprite.png";
        this.kPlatformTexture = "assets/platform.png";
        this.kWallTexture = "assets/wall.png";
        this.kTargetTexture = "assets/target.png";

        // The camera to view the scene
        this.mCamera = null;

        this.mPlatforms = null;
        this.mBounds = null;

        // Object affected by gravity
        this.mGravityObject = null;

        // Draw controls
        this.mDrawBounds = false;

        // Particle Support
        this.mParticles = null;
        this.mPSDrawBounds = false;
    }



    load() {
        engine.texture.load(this.kMinionSprite);
        engine.texture.load(this.kPlatformTexture);
        engine.texture.load(this.kWallTexture);
        engine.texture.load(this.kTargetTexture);
    }

    unload() {
        engine.texture.unload(this.kMinionSprite);
        engine.texture.unload(this.kPlatformTexture);
        engine.texture.unload(this.kWallTexture);
        engine.texture.unload(this.kTargetTexture);
    }

    init() {
        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(50, 40), // position of the camera
            100,                     // width of camera
            [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
        );
        // sets the background to gray
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

        // initializing the platforms
        this.mPlatforms = new engine.GameObjectSet();

        // initializing a gravity object
        this.mGravityObject = new GravitatingObject(this.kMinionSprite, 15, 15, [4,4], true, 12);

        this.createBounds();  // added to mPlatforms

    }

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

        this.mCamera.setViewAndCameraMatrix();

        this.mPlatforms.draw(this.mCamera);

        this.mGravityObject.draw(this.mCamera);
    }

    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {
        this.mPlatforms.update(this.mCamera);
        
        // Particle System
        this.mParticles.update();

        // gravity object update
        this.mGravityObject.update();
    }
}

export default MyGame;