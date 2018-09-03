# @downpourdigital/physics
### **THIS PACKAGE IS WORK IN PROGRESS!**

Simple physics for UI animation!

# Installation
```
yarn add --dev @downpourdigital/physics
```
```
npm i -D @downpourdigital/physics
```
# Usage
```javascript
import {
	World,
	EulerSpring,
	EulerParticle,
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

# TODOS:
- other, more accurate integrations, such as Verlet or RK4
- shiny, clicky examples
- better docs
- ES5 compatible module
