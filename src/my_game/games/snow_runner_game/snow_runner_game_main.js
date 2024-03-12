/*
 * File: MyGame.js 
 *       This is the logic of our game. 
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../../../engine/index.js";
import GravitatingObject from "../../objects/gravitating_object.js";
import GGRunner from "../../objects/gg_game_runner.js";
import MyGame from "../../my_game_main.js";
import Star from "../../objects/star_object.js";
import FirePit from "../../objects/fire_pit.js";

class SnowRunnerGame extends MyGame {
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

        // Draw controls
        this.mDrawBounds = false;

        // Particle Support
        this.mParticles = null;
        this.mPSDrawBounds = false;

        this.mGravObjs = null;

        this.runner = null;

        // The camera to view the scene
        this.mCamera = null;
        this.mBg = null;
        this.kBg = "assets/GameBackground.jpg";
        this.kFire = "assets/FirePitSpriteSheet.png"

        this.mFireSet = null;

        this.pacer = 0;
    }



    load() {
        engine.texture.load(this.kPlatformTexture);
        engine.texture.load(this.kWallTexture);
        engine.texture.load(this.kMinionSprite);
        engine.texture.load(this.kTargetTexture);
        engine.texture.load(this.kFire);
    }

    unload() {
        engine.texture.unload(this.kPlatformTexture);
        engine.texture.unload(this.kWallTexture);
        engine.texture.unload(this.kMinionSprite);
        engine.texture.unload(this.kTargetTexture);
        engine.texture.unload(this.kFire);
    }

    init() {
        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(50, 40), // position of the camera
            100,                     // width of camera
            [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
        );
        // sets the background to gray
        this.mCamera.setBackgroundColor([0.3, 0.4, 0.6, 1]);

        engine.defaultResources.setGlobalAmbientColor([0.5,0.5,0.8,1]);
        
        this.mFireSet = new engine.GameObjectSet();

        this.mFireSet.addToSet(new FirePit(this.kFire, [50, 50], [10, 10], 5));

        // initializing the platforms
        this.mPlatforms = new engine.GameObjectSet();


        this.mParticles = new engine.ParticleSet();

        this.createBounds();  // added to mPlatforms

        //initialize rigid bodies
        this.mAllObjs = new engine.GameObjectSet();

        //initialize Gravity Objects
        this.mGravObjs = new engine.GameObjectSet();
        this.mGravObjs.addToSet(new GGRunner(this.kMinionSprite, 10, 10, [4,4], true, 12));

        //Gravity System
        engine.gravity.setSystemBounds([3.5,6],[96.5,74]);
        engine.gravity.setDefaultDirection(270.0);
        engine.gravity.toggleRandomParticles();
        engine.gravity.setLifespan(100);
        engine.gravity.setSystemSpeed(2);
        engine.gravity.setDensity(3);
        engine.gravity.setSystemSpeed(21);
        engine.gravity.setGravityForce(0.01);

        this.showColor = false;

        this.mGravityParticles = engine.gravity_functions.generateParticles();

    }

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([1, 1, 1, 1.0]); // clear to light gray

        this.mCamera.setViewAndCameraMatrix();
        
        this.mFireSet.draw(this.mCamera);

        this.mPlatforms.draw(this.mCamera);

        this.mGravObjs.draw(this.mCamera);

        this.mAllObjs.draw(this.mCamera);

        this.mGravityParticles.draw(this.mCamera);
        if (this.mPSDrawBounds)
            this.mGravityParticles.drawMarkers(this.mCamera);
        
        
    }

    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {

        if(this.pacer > 5){
            let newDirection = 180 + Math.random() * 90;
            engine.gravity.setDefaultDirection(newDirection);
            this.pacer = 0;
        }

        this.pacer++;

        this.mPlatforms.update(this.mCamera);
        
        // Particle System
        this.mParticles.update();

        //rigid bodies ( no gravity)
        this.mAllObjs.update(this.mCamera);
        engine.physics.processSetToSet(this.mAllObjs, this.mPlatforms, this.mCollisionInfos);

        this.mFireSet.update();

        // gravity object update
        this.mGravObjs.update();
        engine.physics.processSetToSet(this.mGravObjs, this.mPlatforms, this.mCollisionInfos);
        this.mGravityParticles.update(this.mGravObjs);

        
        if(engine.input.isKeyClicked(engine.input.keys.One)){
            this.showColor = !this.showColor;
            let temp = this.showColor?1:0;
            engine.gravity.setParticleStartColor([temp,temp,temp,temp]);
            engine.gravity.setParticleEndColor([temp,temp,temp,temp]);
        this.mGravityParticles = engine.gravity_functions.generateParticles();
        }

        //transitioning between the games
        if(engine.input.isKeyPressed(engine.input.keys.Zero)){
            if(engine.input.isKeyClicked(engine.input.keys.G)){
                engine.gravity.toggleRandomParticles();
                this.next("G");
            }

            if(engine.input.isKeyClicked(engine.input.keys.N)){
                engine.gravity.toggleRandomParticles();
                this.next("N");
            }

            if(engine.input.isKeyClicked(engine.input.keys.S)){
                engine.gravity.toggleRandomParticles();
                this.next("S");
            }
        }
        
    }
    
}


export default SnowRunnerGame;