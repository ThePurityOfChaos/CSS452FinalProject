# Particle Gravity SDK
##### Team Members: Derick DeWitt, 
##### CSS 452 Final Project
##### Professor: Kelvin Sung
##### Winter 2024

## Description:
Our module is designed to add a particle-based system of gravity to the existing system. 
This functionality differs greatly from simple acceleration, instead creating visuals more akin to Brownian Motion with enough particles.
It can also be simplified down into a functionality where acceleration increases as the player gets closer to the ground, 
or a biting wind with visually present particles that actually pushes the player around instead of merely functioning as a slowdown.

## API

### gravity.js

Setters & Getters
These functions modify the default behavior of the system. 

'function setDensity
### gravity_functions.js
These functions could be called from multiple different classes. It's easier to import these functions than to import the entirety of gravity.js.
'function modularize(x,y):' Returns an [x,y] pair within the bounds of the system. 
'function generateParticles():' Generates a (directions * density^2) set of Gravity Emitters uniformly spaced within the bounds of the system. 
'function findDirection(int):' Returns the radian angle of a given integer spoke of the direction wheel. 


### gravity_renderable.js

### gravity_particle.js

### gravity_emitter.js

### gravity_particle_set.js
