# @downpourdigital/physics
### **THIS PACKAGE IS WORK IN PROGRESS!**

Simple physics for UI animation!

# Installation
```
yarn add @downpourdigital/physics
```
```
npm i @downpourdigital/physics
```
# Usage
```javascript
import {
	World,
	EulerSpring,
	EulerParticle,
	ConstantMotion,
} from '@downpourdigital/physics';
```

## `World`
The physics world. It is used to step all simulations forward every frame.

You can either step manually:

```javascript
import {
	World,
} from '@downpourdigital/physics';

// run on every frame:
World.step( delta, time );
```

or use automatic stepping:

```javascript
import {
	World,
} from '@downpourdigital/physics';

// run on the first frame:
World.start();

// to stop/pause:
World.stop();
```

## `EulerParticle`
1D point mass, simulated via Euler method. Inaccurate but fast.

```javascript
import {
	EulerParticle,
} from '@downpourdigital/physics';

const particle = new EulerParticle({
	value: 0, // the value at which to start the simulation
	mass: 1,
	friction: .5, // friction acting on the particle. (values 0-1)
	precision: 100000, // numerical precision of return values
	maxVelocity: Infinity,
	autoStep: true, // whether to use the world for stepping
});
```

#### `.get()`
Returns the current value.

#### `.set( value: number )`
Immediately sets the current value, but keeps velocity.

#### `.add( value: number )`
Adds to velocity.

#### `.reset()`
Resets to original value.

#### `.resetTo( value: number )`
Resets to specific value.

#### `.setForce( value: number )`
Overwrites the force acting on the particle.

#### `.addForce( value: number )`
Adds to the current force acting on the particle.

#### `.step( delta: number )`
Method for manually stepping the simulation forward one frame. This only needs to be called if `autoStep` is disabled.


## `EulerSpring`
1D spring-mass system, simulated via Euler method. Inaccurate but fast.

```javascript
import {
	EulerSpring,
} from '@downpourdigital/physics';

const spring = new EulerParticle({
	value: 0, // the value at which to start the simulation
	mass: 1,
	friction: .5, // friction acting on the spring. (values 0-1)
	stiffness: .2, // spring stiffness (typically 0.1-1)
	precision: 100000, // numerical precision of return values
	maxVelocity: Infinity,
	maxAcceleration: Infinity,
	autoStep: true, // whether to use the world for stepping
});
```

#### `.get()`
Returns the current value.

#### `.set( value: number )`
Sets the target value. The spring will start pulling towards that value.

#### `.reset()`
Resets to original value.

#### `.resetTo( value: number )`
Resets to specific value.

#### `.step( delta: number )`
Method for manually stepping the simulation forward one frame. This only needs to be called if `autoStep` is disabled.

## `ConstantMotion`

1D value that moves towards a given value at a constant speed. Useful for timers and as input for easing functions.

```javascript
import {
	ConstantMotion,
} from '@downpourdigital/physics';

const motion = new ConstantMotion({
	value: 0, // start value
	speed: 1, // change in value per second
	autoStep: true, // whether to use the world for stepping
});
```
Methods are the same as `EulerSpring`.

# TODOS:
- other, more accurate integrations, such as Verlet or RK4
- 2D and 3D implementations
- shiny, clicky examples
- better docs
- ES5 compatible module
