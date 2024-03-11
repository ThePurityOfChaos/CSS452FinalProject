/*
 * File: MyGame.js 
 *       This is the logic of our game. 
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import MyGame from "../../my_game_main.js";
import engine from "../../../engine/index.js";
import Star from "../../objects/star_object.js";

class GravityGunGame extends MyGame {
    constructor() {
        super();

        // The camera to view the scene
        this.mCamera = null;
        this.mBg = null;
        this.mStar = null;
        this.kBg = "assets/GameBackground.jpg";
        this.kStar = "assets/StarSpriteSheet.png";
    }



    load() {
        engine.texture.load(this.kBg);
        engine.texture.load(this.kStar);
    }

    unload() {
        engine.texture.unload(this.kBg);
        engine.texture.unload(this.kStar);
    }

    init() {
        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(50, 40), // position of the camera
            100,                     // width of camera
            [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
        );
        // sets the background to gray
        this.mCamera.setBackgroundColor([1, 1, 1, 0]);

        // Large background image
        let bgR = new engine.SpriteRenderable(this.kBg);
        bgR.setElementPixelPositions(0, 800, 0, 600);
        bgR.getXform().setSize(100, 100);
        bgR.getXform().setPosition(50, 35);
        this.mBg = new engine.GameObject(bgR);
        
        this.mStar = new Star(this.kStar, [50, 40], [15, 15]);

    }

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        this.mCamera.setViewAndCameraMatrix();
        this.mBg.draw(this.mCamera);
        this.mStar.draw(this.mCamera);
        
    }

    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {

        this.mStar.update();

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