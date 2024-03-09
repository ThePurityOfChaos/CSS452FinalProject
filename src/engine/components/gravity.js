/* 
*   File: gravity.js
*   Particle-based Gravity System Support
*/
"use strict"
import * as defaultResources from "../resources/default_resources.js"
import * as gravityFunctions from "./gravity_functions.js";
import GravityParticle from "../particles/gravity_particle.js";


let mGSystemDirections = 1;
let mGSystemDefaultDirection = 0.0;
let mGSystemBounds = [0,0,0,0];
let mGDensity = 3;
let mGSystemForce = 0.05;
let mGSystemSpeed = 10;
let mGSystemLife = 10;
let mGParticleStartColor = [1,1,1,1];
let mGParticleEndColor = [1,1,1,1];
let randomParticles = false;
let modularSpace = false;
let customColors = false;

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
function toggleRandomParticles(){
    randomParticles=!randomParticles;
}
function getRandomParticles(){
    return randomParticles;
}
function toggleCustomColors(){
    customColors=!customColors;
}
function usingCustomColors(){
    return customColors;
}

function toggleModularSpace(){
    modularSpace = !modularSpace;
}
function isModularSpace(){
    return modularSpace;
}
//input: int/float
function setLifespan(lifespan){
    mGSystemLife = lifespan;
}
function getLifespan(){
    return mGSystemLife;
}

function creatorFunc(atX, atY, direction){
    let dx,dy;
    atX == null?dx = mGSystemBounds[0]+mGSystemBounds[2]*Math.random():dx=atX;

    atY == null?dy = mGSystemBounds[1]+mGSystemBounds[3]*Math.random():dy=atY;

    // should be based on system bounds and speed (when it would hit the wall, or reach its starting point if modular space. Currently just a value.)
    let life = mGSystemLife;

    let p = new GravityParticle(defaultResources.getDefaultPSTexture(), dx, dy, life);
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

    if(customColors){
    p.setColor([fy,fx,Math.abs(fx-fy),0.05]);
    p.setFinalColor([fy,fx,Math.abs(fx-fy),0.05]);
    }
    p.setVelocity(fx, fy);
    p.setDirection(thisDirection);
    // size delta
    p.setSizeDelta(1);
    

    arguments.length>3?p.setForce(arguments[3]):p.setForce(mGSystemForce);
    
    return p;
}
export {
    //particle creator function
    creatorFunc, 
    //particle base manipulations
    toggleRandomParticles, toggleModularSpace, toggleCustomColors,
    getRandomParticles, isModularSpace, usingCustomColors,
    //getters and setters
    getSystemBounds, getSystemDirections, getDensity, getGravityForce, getDefaultDirection, getParticleStartColor, getParticleEndColor, getSystemDefaultDirection, getLifespan,
    setSystemBounds, setSystemDirections, setDensity, setGravityForce, setDefaultDirection, setParticleStartColor, setParticleEndColor, setSystemDefaultDirection, setLifespan,
    getSystemSpeed,
    setSystemSpeed

}