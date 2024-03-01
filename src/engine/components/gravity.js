/* 
*   File: gravity.js
*   Particle-based Gravity System Support
*/
"use strict"
let mGSystemDirections = 1;
let mGSystemDefaultDirection = 270.0;
let mGSystemBounds = [0,0,0,0];
let mGDensity = 3;
let mGSystemForce = 10.0;
let mGSystemSpeed = 10;
let mGSystemLife = 100;
let mGParticleStartColor = [1,1,1,0];
let mGParticleEndColor = [0,0,0,1];

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

function getSystemSpeed()
{
    return mGSystemSpeed;
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
//vec4 color
function setParticleStartColor(color){
    mGParticleStartColor = color;
}
function getParticleStartColor(){
    return mGParticleStartColor;
}
//vec4 color
function setParticleEndColor(color){
    mGParticleEndColor = color;
}
function getParticleEndColor(){
    return mGParticleStartColor;
}

function creatorFunc(direction){
    // should be based on system bounds and speed (when it would hit the wall, or reach its starting point if modular space. Currently just a value.)
    let life = mGSystemLife;

    let p = new engine.GravityParticle(engine.defaultResources.getDefaultPSTexture(), atX, atY, life);
    p.setColor(mGParticleStartColor);
    
    // size of the particle
    let r = 1;
    p.setSize(r, r);
    
    // final color
    p.setFinalColor(mGParticleEndColor);
    
    // velocity on the particle
    let thisDirection = gravityFunctions.findDirection(direction);
    let fx = mGSystemSpeed * Math.cos(thisDirection);
    let fy = mGSystemSpeed * Math.sin(thisDirection);
    p.setVelocity(fx, fy);
    
    // size delta
    p.setSizeDelta(1);
    
    return p;
}
export {
    //particle creator function
    creatorFunc, 
    //getters and setters
    getSystemBounds, getSystemDirections, getDensity, getGravityForce, getDefaultDirection, getParticleStartColor, getParticleEndColor,
    setSystemBounds, setSystemDirections, setDensity, setGravityForce, setDefaultDirection, setParticleStartColor, setParticleEndColor,
    getSystemSpeed

}