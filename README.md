# @downpourdigital/physics

![npm bundle size](https://img.shields.io/bundlephobia/minzip/@downpourdigital/physics?color=green&style=for-the-badge)

Spring physics for (UI-) animation!

## Installation

This package depends on [@downpourdigital/scheduler](https://www.npmjs.com/package/@downpourdigital/scheduler).

```
yarn add @downpourdigital/physics
```
```
npm i --save @downpourdigital/physics
```


## Usage

```typescript
import {
	EulerSpring,
	EulerSpring2D,
	EulerSpring3D,
	RK4Spring,
	RK4Spring2D,
	RK4Spring3D,			
	LinearMotion,
	Passthrough,
} from "@downpourdigital/physics";
```
As this package depends on [@downpourdigital/scheduler](https://www.npmjs.com/package/@downpourdigital/scheduler), remember to call `scheduler.start()` somewhere in your app.

## Simulation Variants

Springs are available as 1D, 2D and 3D versions, as well as with two different integrators.

* `EulerSpring`s are integrated via the [semi-implicit Euler method](https://en.wikipedia.org/wiki/Semi-implicit_Euler_method). They are cheap to compute and probably good enough for most applications.

* `RK4Spring`s are integrated via the [Runge–Kutta fourth order method](https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods). While computation-heavy, they are more accurate and may also be more stable under certain conditions.


## Timestep

All simulations use a semi-fixed timestep internally. While the actual calculation is tied to the framerate, you can specify a maximum duration per simulation timestep (`maxTimestep`). If the interval between frames is higher than the max duration, it will be divided into multiple simulation timesteps. The amount of 'substeps' can be limited via `maxStepCount`.

Decreasing `maxTimestep` generally yields higher accuracy.

#### Example

```typescript
import {
	RK4Spring,
} from "@downpourdigital/physics";

const spring = new RK4Spring({
	maxTimestep: 17, // in ms (default: 17)
	maxStepCount: 8, // (default: 8)
});
```


## Springs

### Config

A spring represents a mass-spring-damper system. It accepts the following options:

* `mass` mass in kg (default: `1`)
* `stiffness` usually `1-500` (default: `250`) Higher values cause the spring to be stiffer. (spring constant ***k*** from [Hooke's Law](https://en.wikipedia.org/wiki/Hooke's_law))
* `damping` usually `1-100` (default: `15`) Higher values reduce oscillations more. ([damping coefficient](https://en.wikipedia.org/wiki/Damping_ratio) ***b***)
* `value` initial position (default: `0`)
* `velocity` initial velocity (default: `0`)
* `restDelta` the minimum speed (velocity magnitude) after which the system is considered resting. (default: `.0001`) 


#### Example

```typescript
import {
	RK4Spring,
} from "@downpourdigital/physics";

const spring = new RK4Spring({
	mass: 1,
	stiffness: 250,
	damping: 15,
});
```

### Props and Methods

* ##### `isResting: boolean`

  Indicates wether the simulation is in a resting state or actively changing.


* ##### `set( value: number ): void `

  Sets the spring target to a given position. The spring will subsequently begin moving towards that position.


* ##### `get(): number `

  Returns the current spring position.


* ##### `getVelocity(): number`

  Returns the current velocity.


* ##### `reset(): void`

  Resets the spring to its initial position and to zero velocity.


* ##### `resetTo( value: number ): void`

  Resets the spring to a given position and to zero velocity.


* ##### `stop(): void` 

  Ends the simulation.


### 2D and 3D specific methods

* ##### `set( value: vec2 | vec3 ): void` and `resetTo( value: vec2 | vec3 ): void`

  `set` and `resetTo` expect the value to be a [`gl-matrix`](http://glmatrix.net/) `vec2`/`vec3` on the 2D and 3D versions respectively.


* ##### `get( out: vec2 | vec3 ): void` and `getVelocity( out: vec2 | vec3 ): void`

  Similarly to [`gl-matrix`](http://glmatrix.net/) functions, `get` and `getVelocity` don't return the position but rather expect an `out` vector to write the result to. This allows for better optimisation. 


* ##### `read(): vec2 | vec3` and `readVelocity(): vec2 | vec3`

  `read` and `readVelocity` return the internal vector representation of position and velocity respectively.  
  As they are being used internally, **they should only be read**. Mutating them will mess up the simulation. Also their values will change as the simulation runs.


## Passthrough

`Passthrough` is a drop-in replacement for any 1D spring. As the name suggests, it just passes through the target value unaltered.

## LinearMotion

`LinearMotion` represents a uniform linear motion with constant velocity/zero acceleration. It moves towards a given target at a given constant speed.

The API surface is the same as with other 1D springs.

#### Example

```typescript
import {
	LinearMotion,
} from "@downpourdigital/physics";

const spring = new LinearMotion({
	value: 0, // initial position (default: 0)
	speed: 1, // speed in units per second (default: 1)
});
```

## Manual stepping

Stepping can also be done manually: if `autoStep: false` is passed in the config of any simulation, it won't be attached to the physics world. You can now step each simulation individually or bundle multiple simulations together in a physics world.

#### Example

```typescript
import {
	World,
	EulerSpring,
} from "@downpourdigital/physics";

const spring = new EulerSpring({
	autoStep: false,
});

// either step individually
spring.step( time );

// or bundle in a world
const world = new World();
world.add( spring );

world.step( time );

```


## License

© 2020 [DOWNPOUR DIGITAL](https://downpour.digital), licensed under BSD-4-Clause
