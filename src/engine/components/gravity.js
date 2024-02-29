/* 
*
*   File: gravity.js
*
*   Particle-based Gravity System Support
*
*/
"use strict"
let mGSystemDirections = 1;
let mGSystemDefaultDirection = 0.0;
let mGSystemBounds = [0,0,0,0];
let mGDensity = 3;
let mGSystemForce = 10.0;
let mGSystemSpeed = 10;
let mSystemLife = 100;

//input: int density
function setDensity(newDensity){
    mGDensity = newDensity;
}
function getDensity(){
    return mGDensity;
}
//input: 
function setSystemBounds([x,y],[x2,y2]){
    mGSystemBounds = [x,y,x2,y2];
}
function getSystemBounds(){
    return mGSystemBounds;
}

//input: int directions, float defaultDirection if desired
function setSystemDirections(directions){
    mGSystemDirections = directions;
    arguments>1?mGSystemDefaultDirection=arguments[1]:null;
}
function getSystemDirections(){
    return mGSystemDirections;
}
//float or integer force
function setGravityForce(force){
    mGSystemForce = force;
}
function getGravityForce(){
    return mGSystemForce;
}
//float or integer
function setDefaultDirection(direction){
    mGSystemDefaultDirection = direction % 360;
}
function getDefaultDirection(){
    return mGSystemDefaultDirection;
}

function creatorFunc(direction){
    // should be based on system bounds and speed (when it would hit the wall, or reach its starting point if modular space)
    let life = mSystemLife;

    let p = new engine.GravityParticle(engine.defaultResources.getDefaultPSTexture(), atX, atY, life);
    p.setColor([1, 1, 1, 0]);
    
    // size of the particle
    let r = 1;
    p.setSize(r, r);
    
    // final color (colorful currently)
    let fr = 0
    let fg = 0
    let fb = 0
    p.setFinalColor([fr, fg, fb, 1]);
    
    // velocity on the particle
    let fx = mGSystemSpeed;
    let fy = mGSystemSpeed;
    p.setVelocity(fx, fy);
    
    // size delta
    p.setSizeDelta(1);
    
    return p;
}
export {
    //particle creator function
    creatorFunc, 
    //getters and setters
    getSystemBounds, getSystemDirections, getDensity, getGravityForce, getDefaultDirection,
    setSystemBounds, setSystemDirections, setDensity, setGravityForce, setDefaultDirection

}