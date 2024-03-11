/*
 * File: my_game.js
 *
 *       interface file to the index.html
 */

import engine from "../engine/index.js";
import MyGame from "./my_game_main.js";
import GravitySimulation from "./games/gravity_simulation/gravity_simulation.js";
import GravityGunGame from "./games/gravity_gun_game/gravity_gun_game.js";
import SnowRunnerGame from "./games/snow_runner_game/snow_runner_game.js";

MyGame.prototype.chooseGame = function(gameCode) {
    switch (gameCode) {
        case "G":
          return new GravitySimulation;
          break;
        case "N":
          return new GravityGunGame;
          break;
        case "S":
          return new SnowRunnerGame;
          break;
        default:
          console.log("error: no game with the code " + gameCode);
          return null;
    }
}

// 
MyGame.prototype.next = function(gameCode) {      
    engine.Scene.prototype.next.call(this);  // this is calling Scene.next()

    // next scene to run
    let nextLevel = this.chooseGame(gameCode);  // next level to be loaded
    nextLevel.start();
}

window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new MyGame();
    myGame.start();
}