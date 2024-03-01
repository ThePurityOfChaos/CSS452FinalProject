/* 
*   File: gravity.js
*   Particle-based Gravity System Support
*/
"use strict"
import * as defaultResources from "../resources/default_resources.js"
import * as gravityFunctions from "./gravity_functions.js";
import GravityParticle from "../particles/gravity_particle.js";


let mGSystemDirections = 16;
let mGSystemDefaultDirection = 270.0;
let mGSystemBounds = [10,10,90,70];
let mGDensity = 5;
let mGSystemForce = 5.0;
let mGSystemSpeed = 50;
let mGSystemLife = 10;
let mGParticleStartColor = [1,1,1,1];
let mGParticleEndColor = [1,1,1,1];

//input: int
function setDensity(newDensity){
    mGDensity = newDensity;
}
function getDensity(){
    return mGDensity;
}
//input: vec2, vec2
function setSystemBounds([x,y],[x2,y2]){
    mGSystemBounds = [x,y,x2,y2];
}
function getSystemBounds(){
    return mGSystemBounds;
}
//input: int/float 
function setSystemSpeed(speed)
{
    mGSystemSpeed=speed;
}
function getSystemSpeed()
{
    return mGSystemSpeed;
}

//input: int directions, float defaultDirection if desired
function setSystemDirections(directions){
    mGSystemDirections = directions;
    arguments>1?mGSystemDefaultDirection=arguments[1]%360.0:null;
}
function getSystemDirections(){
    return mGSystemDirections;
}
//input: int/float
function setSystemDefaultDirection(direction){
    mGSystemDefaultDirection=direction%360.0;
}
function getSystemDefaultDirection(){
    return mGSystemDefaultDirection;
}
//input: int/float
function setGravityForce(force){
    mGSystemForce = force;
}
function getGravityForce(){
    return mGSystemForce;
}
//input: int/float
function setDefaultDirection(direction){
    mGSystemDefaultDirection = direction % 360;
}
function getDefaultDirection(){
    return mGSystemDefaultDirection;
}
//input: vec4
function setParticleStartColor(color){
    mGParticleStartColor = color;
}
function getParticleStartColor(){
    return mGParticleStartColor;
}
//input: vec4
function setParticleEndColor(color){
    mGParticleEndColor = color;
}
function getParticleEndColor(){
    return mGParticleEndColor;
}

function creatorFunc(atX, atY, direction){
    // should be based on system bounds and speed (when it would hit the wall, or reach its starting point if modular space. Currently just a value.)
    let life = mGSystemLife;

    let p = new GravityParticle(defaultResources.getDefaultPSTexture(), atX, atY, life);
    p.setColor(mGParticleStartColor);
    
    // size of the particle
    let r = 1;
    p.setSize(r, r);
    
    // final color
    p.setFinalColor(mGParticleEndColor);
    
    // velocity on the particle, in radians
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
    getSystemBounds, getSystemDirections, getDensity, getGravityForce, getDefaultDirection, getParticleStartColor, getParticleEndColor, getSystemDefaultDirection,
    setSystemBounds, setSystemDirections, setDensity, setGravityForce, setDefaultDirection, setParticleStartColor, setParticleEndColor, setSystemDefaultDirection,
    getSystemSpeed,
    setSystemSpeed

}