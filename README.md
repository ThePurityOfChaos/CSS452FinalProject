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

'function creatorFunc(float atX, float atY, int direction)
[Overloaded options: float speed, float force, float maxForce, vec4 startColor, vec4 endColor]: ' Creates a gravity particle with these specifications. Overloaded parameters are optional. If they are not used, the default values will be used. Either do not include them, or assign them to 'null' to skip them.
This is mostly an internal function, but may be used standalone. 

#### Setters & Getters

These functions modify the default behavior of the system. 

#### Setters

'function setDensity(int):' Sets the default density of the system. Used in 'generateParticles()' to define how many Gravity Emitters should be made.

'function setSystemBounds(vec2,vec2):' Sets the current system bounds for gravity particles to be generated within. 

'function setSystemSpeed(int or float):' Sets the default gravity particle speed.

'function setSystemDirections(int):' Sets the default number of directions when generating particles.

'function setGravityForce(int or float):' Sets the default force exerted when a particle collides with a 'gravity_renderable'.

'function setMaxForce(int or float):' Sets the default speed at which a particle will no longer exert force except to slow down an object.

'function setDefaultDirection(int or float):' Sets the default direction that the particle at "spoke 0" will travel.

'function setParticleStartColor(vec4):' Sets the default starting color that the particles will be colored. 

'function setParticleEndColor(vec4):' Sets the default ending color that the particles will be colored.

'function setLifespan(lifespan):' Sets the default lifespan of particles.

'function toggleRandomParticles():' Toggles whether or not the particles will spawn in a random location within the bounds, or will spawn in an ordered structure.

'function toggleCustomColors():' Testing function used to toggle coloration based on velocity. Overrides particle colors when enabled.

'function toggleModularSpace():' Toggles whether or not particles and gravity renderables' locations will be modularized based on the bounds.


#### Getters

'function getDensity():' Returns the current default density ('int').

'function getSystemBounds():' Returns the system bounds in the form '[x,y,x2,y2]'.

'function getSystemSpeed():' Returns the default gravity particle speed ('int' or 'float').

'function getSystemDirections():' Returns the current default number of directions, or "spokes on the wheel," of the system ('int').

'function getGravityForce():' Returns the default force exerted when a particle collides with a 'gravity_renderable' ('int' or 'float').

'function getMaxForce():' Returns the default speed at which a particle will no longer exert force except to slow down an object ('int' or 'float').

'function getDefaultDirection():' Returns the default direction that the particle at "spoke 0" will travel ('int').

'function getParticleStartColor():' Returns the default starting color that the particles will be colored, in the form '[r,g,b,a]'. 

'function getParticleEndColor():' Returns the default ending color that the particles will be colored, in the form '[r,g,b,a]'.

'function getLifespan():' Returns the default lifespan of particles ('int').

'function getRandomParticles():' Returns whether or not the particles will spawn randomly ('boolean').

'function usingCustomColors():' Returns whether or not colors are based on velocity ('boolean').

'function isModularSpace():' Returns whether or not the space is currently modular ('boolean').


### gravity_functions.js
These functions could be called from multiple different classes. It's easier to import these functions than to import the entirety of 'gravity.js'.

'function modularize(x,y):' Returns an '[x,y]' pair within the bounds of the system. 

'function generateParticles():' Generates a 'directions * density^2' set of Gravity Emitters uniformly spaced within the bounds of the system. 

'function findDirection(int):' Returns the radian angle of a given spoke of the direction wheel. Untested with 'float', so 'int' is suggested.

### gravity_particle.js

### gravity_emitter.js

### gravity_renderable.js

### gravity_particle_set.js



### File Organization

