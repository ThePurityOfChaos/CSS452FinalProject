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

'function creatorFunc(float atX,float atY, int direction)[Overloaded options: float speed, float force, float maxForce, [float r, float g, float b, float a] startColor, [float r, float g, float b, float a] endColor]:' Creates a gravity particle with these specifications. Overloaded parameters are optional. If they are not used, the default values will be used.

#### Setters & Getters

These functions modify the default behavior of the system. 

#### Setters

'function setDensity(int):' Sets the default density of the system. Used in 'generateParticles()' to define how many Gravity Emitters should be made.

'function setSystemBounds([x,y],[x2,y2]):' Sets the current system bounds for gravity particles to be generated within. 

'function setSystemSpeed(int or float):' Sets the default gravity particle speed.

'function setSystemDirections(int):' Sets the default number of directions when generating particles.

'function setGravityForce(int or float):' Sets the default force exerted when a particle collides with a 'gravity_renderable'.



#### Getters

'function getDensity():' Returns the current default density ('int').

'function getSystemBounds():' Returns the system bounds in the form '[x,y,x2,y2]'.

'function getSystemSpeed():' Returns the default gravity particle speed ('int' or 'float').

'function getSystemDirections():' Returns the current default number of directions, or "spokes on the wheel," of the system ('int').
### gravity_functions.js
These functions could be called from multiple different classes. It's easier to import these functions than to import the entirety of 'gravity.js'.

'function modularize(x,y):' Returns an '[x,y]' pair within the bounds of the system. 

'function generateParticles():' Generates a 'directions * density^2' set of Gravity Emitters uniformly spaced within the bounds of the system. 

'function findDirection(int):' Returns the radian angle of a given spoke of the direction wheel. Untested with 'float', so 'int' is suggested.

### gravity_particle.js

### gravity_emitter.js

### gravity_renderable.js
Extends sprite_renderable.js
Used the create an instance of a type of renderable that gets affected by gravity

Functions:
'constructor(texture, gravitating, mass)': calls super(texture) and sets whether the object is affected by gravity or not based on "gravitating"

'collide(particle): gets called when a collision between this object and a particle is detected,it's velocity gets affected based on the particle's velocity/direction

getters/setters: to get from or set a new value for the renderable

'update()': updates the renderable's position based on its current velocity, and checks for collisions with boundaries

### gravity_particle_set.js



### File Organization

