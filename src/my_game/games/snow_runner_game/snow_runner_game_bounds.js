/*
 * File: snow_runner_game_bounds.js 
 * This is the snow runner game's bounds
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../../../engine/index.js";
import SnowRunnerGame from "./snow_runner_game_main.js";

SnowRunnerGame.prototype.createBounds = function() {
    let x = 15, w = 30, y = 4;
    for (x = 15; x < 120; x+=30) 
        this.platformAt(x, y, w, 0);
    y = 76;
    for (x = 15; x < 120; x+=30) 
        this.platformAt(x, y, w, 180);
    
    this.platformAt(40, 39, 10, 0);
    this.platformAt(60, 39, 10, 0);
    this.platformAt(60, 50, 20, 90);
    this.platformAt(40, 50, 20, 90);
    this.platformAt(50, 61, 20, 0);
    
    x = 2;
    w = 3;
    for (y = 8; y < 90; y+=12) 
        this.wallAt(x, y, w);
    x = 98;
    for (y = 8; y < 90; y+=12) 
        this.wallAt(x, y, w);
    
    let r = new engine.TextureRenderable(this.kTargetTexture);
    this.mTarget = new engine.GameObject(r);
    let xf = r.getXform();
    xf.setSize(3, 3);
}

SnowRunnerGame.prototype.wallAt = function (x, y, w) {
    let h = w * 4;
    let p = new engine.TextureRenderable(this.kWallTexture);
    let xf = p.getXform();
    
    let g = new engine.GameObject(p);
    let r = new engine.RigidRectangle(xf, w, h);
    g.setRigidBody(r);
    g.toggleDrawRenderable();
    g.toggleDrawRigidShape();
    
    r.setMass(0);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    this.mPlatforms.addToSet(g);
}

SnowRunnerGame.prototype.platformAt = function (x, y, w, rot) {
    let h = w / 8;
    let p = new engine.TextureRenderable(this.kPlatformTexture);
    let xf = p.getXform();
    
    let g = new engine.GameObject(p);
    let r = new engine.RigidRectangle(xf, w, h);
    g.setRigidBody(r);
    g.toggleDrawRenderable();
    g.toggleDrawRigidShape();
    
    r.setMass(0);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    xf.setRotationInDegree(rot);
    this.mPlatforms.addToSet(g);
}
export default SnowRunnerGame;