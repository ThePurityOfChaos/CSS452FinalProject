/*
 * File: MyGame.js 
 *       This is the logic of our game. 
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../../../engine/index.js";
import Hero from "../../objects/hero.js";
import Minion from "../../objects/minion.js";
import GravitatingObject from "../../objects/gravitating_object.js";
import GGRunner from "../../objects/gg_game_runner.js";
import MyGame from "../../my_game_main.js";

class GravityGunGame extends MyGame {
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

        this.runner = null;
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


        this.mParticles = new engine.ParticleSet();

        this.createBounds();  // added to mPlatforms

        //initialize rigid bodies
        this.mAllObjs = new engine.GameObjectSet();

        //initialize Gravity Objects
        this.mGravObjs = new engine.GameObjectSet();
        this.mGravObjs.addToSet(new GravitatingObject(this.kMinionSprite, 15, 15, [4,4], true, 12));
        this.mGravObjs.addToSet(new GravitatingObject(this.kMinionSprite, 15, 15, [4,4], true, 12));
        this.mGravObjs.addToSet(new GravitatingObject(this.kMinionSprite, 15, 15, [4,4], true, 12));
        this.mGravObjs.addToSet(new GGRunner(this.kMinionSprite, 50, 50, [4,4], true, 12));

        //Gravity System
        engine.gravity.setSystemBounds([3.5,6],[96.5,74]);
        engine.gravity.setDefaultDirection(270.0);
        engine.gravity.toggleRandomParticles();
        engine.gravity.setLifespan(180);
        engine.gravity.setSystemSpeed(2);
        engine.gravity.setDensity(3);

        this.mGravityParticles = engine.gravity_functions.generateParticles();

        //Gravity Gun
        let bounds = engine.gravity.getSystemBounds();

        this.mGravityGun = new engine.GravityParticleSet();
        //x, y, num, perpetual, direction, (optional) custom speed, (optional) custom force, (optional) custom max force
        this.mGravityGun.addEmitterAt(((bounds[2]-bounds[0])/2+bounds[0]),((bounds[3]-bounds[1])/2*1.8+bounds[1]),10,true,0,200,1,10);
    }

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

        this.mCamera.setViewAndCameraMatrix();

        this.mPlatforms.draw(this.mCamera);

        this.mGravObjs.draw(this.mCamera);

        this.mAllObjs.draw(this.mCamera);

        this.mGravityParticles.draw(this.mCamera);
        if (this.mPSDrawBounds)
            this.mGravityParticles.drawMarkers(this.mCamera);

        this.mGravityGun.draw(this.mCamera);
        
        // this.runner.draw(this.mCamera);
    }

    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {
        this.mPlatforms.update(this.mCamera);
        
        // Particle System
        this.mParticles.update();

        // this.runner.update();

        //Gravity System
        if(engine.input.isKeyPressed(engine.input.keys.Left))
        this.mGravityGun.getEmitterAt(0).move(-0.25,0);
        if(engine.input.isKeyPressed(engine.input.keys.Right))
        this.mGravityGun.getEmitterAt(0).move(0.25,0);

        if(engine.input.isKeyClicked(engine.input.keys.M)){
            engine.gravity.toggleModularSpace();
        }
        if(engine.input.isKeyClicked(engine.input.keys.C)){
            engine.gravity.toggleCustomColors();
        }
        
        //rigid bodies ( no gravity)
        this.mAllObjs.update(this.mCamera);
        engine.physics.processSetToSet(this.mAllObjs, this.mPlatforms, this.mCollisionInfos);
        // gravity object update
        this.mGravObjs.update(this.mCamera);
        engine.physics.processSetToSet(this.mGravObjs, this.mPlatforms, this.mCollisionInfos);
        this.mGravityParticles.update(this.mGravObjs);

        this.mGravityGun.update(this.mGravObjs);

        
        
    }
    
}
function _createParticle(atX, atY) {
    let life = 30 + Math.random() * 200;
    let p = new engine.Particle(engine.defaultResources.getDefaultPSTexture(), atX, atY, life);
    p.setColor([1, 0, 0, 1]);
    
    // size of the particle
    let r = 5.5 + Math.random() * 0.5;
    p.setSize(r, r);
    
    // final color
    let fr = 3.5 + Math.random();
    let fg = 0.4 + 0.1 * Math.random();
    let fb = 0.3 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);
    
    // velocity on the particle
    let fx = 10 - 20 * Math.random();
    let fy = 10 * Math.random();
    p.setVelocity(fx, fy);
    
    // size delta
    p.setSizeDelta(0.98);
    
    return p;
}

export default GravityGunGame;