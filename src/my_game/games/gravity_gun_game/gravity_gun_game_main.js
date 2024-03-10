/*
 * File: MyGame.js 
 *       This is the logic of our game. 
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import MyGame from "../../my_game_main.js";
import engine from "../../../engine/index.js";

class GravityGunGame extends MyGame {
    constructor() {
        super();

        // The camera to view the scene
        this.mCamera = null;
        this.kBg = "assets/GameBackground.jpg"
    }



    load() {
        engine.texture.load(this.kBg);
    }

    unload() {
        engine.texture.unload(this.kBg);
    }

    init() {
        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(50, 40), // position of the camera
            100,                     // width of camera
            [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
        );
        // sets the background to gray
        this.mCamera.setBackgroundColor([0, 0, 0, 0]);

        // Large background image
        let bgR = new engine.SpriteRenderable(this.kBg);
        bgR.setElementPixelPositions(0, 800, 0, 600);
        bgR.getXform().setSize(100, 100);
        bgR.getXform().setPosition(50, 35);
        this.mBg = new engine.GameObject(bgR);
        

    }

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 0]); // clear to light gray

        this.mCamera.setViewAndCameraMatrix();
        this.mBg.draw(this.mCamera);
        
    }

    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {

        if(engine.input.isKeyClicked(engine.input.keys.G)){
            this.next("G");
        }

        if(engine.input.isKeyClicked(engine.input.keys.N)){
            this.next("N");
        }

        if(engine.input.isKeyClicked(engine.input.keys.S)){
            this.next("S");
        }

    }
    
}

export default GravityGunGame;