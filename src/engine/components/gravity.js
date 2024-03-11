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
let mGSystemMaxForce = 1;
let mGParticleStartColor = [1,1,1,1];
let mGParticleEndColor = [1,1,1,1];
let mGRandomParticles = false;
let mGModularSpace = false;
let mGCustomColors = false;

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
function setMaxForce(force){
    mGSystemMaxForce = force;
}
function getMaxForce(){
    return mGSystemMaxForce;
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
    mGRandomParticles=!mGRandomParticles;
}
function getRandomParticles(){
    return mGRandomParticles;
}
function toggleCustomColors(){
    mGCustomColors=!mGCustomColors;
}
function usingCustomColors(){
    return mGCustomColors;
}

function toggleModularSpace(){
    mGModularSpace = !mGModularSpace;
}
function isModularSpace(){
    return mGModularSpace;
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
    
    
    // size of the particle
    let r = 1;
    p.setSize(r, r);
    
    
    
    // velocity on the particle, in radians
    let thisDirection = gravityFunctions.findDirection(direction);
    let thisSpeed = arguments.length>3?arguments[3]:mGSystemSpeed;
    
    let fx = thisSpeed * Math.cos(thisDirection);
    let fy = thisSpeed * Math.sin(thisDirection);

    
    p.setVelocity(fx, fy);
    p.setDirection(thisDirection);
    // size delta
    p.setSizeDelta(1);
    
    arguments.length>4?p.setForce(arguments[4]):p.setForce(mGSystemForce);
    arguments.length>5?p.setMaxForce(arguments[5]):p.setMaxForce(mGSystemMaxForce);
    let startColor = arguments.length>6?arguments[6]:mGParticleStartColor;
    p.setColor(startColor);
    let endColor = arguments.length>7?arguments[7]:mGParticleEndColor;
    p.setFinalColor(endColor);
    if(mGCustomColors){
        p.setColor([fy,fx,Math.abs(fx-fy),0.05]);
        p.setFinalColor([fy,fx,Math.abs(fx-fy),0.05]);
        }
    return p;
}
export {
    //particle creator function
    creatorFunc, 
    //particle base manipulations
    toggleRandomParticles, toggleModularSpace, toggleCustomColors,
    getRandomParticles, isModularSpace, usingCustomColors,
    //getters and setters
    getSystemBounds, getSystemDirections, getDensity, getGravityForce, getDefaultDirection, getParticleStartColor, getParticleEndColor, getSystemDefaultDirection, getLifespan, getMaxForce,
    setSystemBounds, setSystemDirections, setDensity, setGravityForce, setDefaultDirection, setParticleStartColor, setParticleEndColor, setSystemDefaultDirection, setLifespan, setMaxForce,
    getSystemSpeed,
    setSystemSpeed

}