import { vec2 } from 'gl-matrix';

import {
	InternalSpring2DConfig,
	Spring2DConfig,
} from './configs';
import {
	Stepable,
	Computable2D,
} from './Computable';

import World from './World';


const zero = vec2.create();
const temp = vec2.create();

export default class EulerSpring2D implements Stepable, Computable2D {
	private current: vec2 = vec2.create();
	private target: vec2 = vec2.create();
	public config: InternalSpring2DConfig;
	public enabled = true;
	public velocity: vec2 = vec2.create();

	constructor( config: Spring2DConfig = {}) {
		this.config = Object.assign(
			{
				value: zero,
				mass: 1,
				friction: .5,
				precision: 100000,
				stiffness: .2,
				maxVelocity: Infinity,
				maxAcceleration: Infinity,
			},
			config,
		);

		this.reset();

		if ( config.autoStep !== false ) World.add( this );
	}


	get( out: vec2 ): void {
		vec2.set(
			out,
			Math.round( this.current[0] * this.config.precision )
			/ this.config.precision,
			Math.round( this.current[1] * this.config.precision )
			/ this.config.precision
		);
	}


	set( value: vec2 ): void {
		vec2.copy( this.target, value );
	}


	reset(): void {
		this.resetTo( this.config.value );
	}


	resetTo( value: vec2 ): void {
		vec2.copy( this.current, value );
		vec2.copy( this.target, value );
		vec2.set( this.velocity, 0, 0 );
	}


	unschedule(): void {
		World.remove( this );
	}


	step( delta: number ): void {
		vec2.sub( temp, this.target, this.current );
		vec2.mul( temp, temp, [this.config.stiffness, this.config.stiffness]);

		const m = 1 / this.config.mass;
		vec2.mul( temp, temp, [m, m]);

		// acceleration
		const accelerationScalar = this.config.maxAcceleration / vec2.length( temp );
		if ( accelerationScalar < 1 ) {
			vec2.mul( temp, temp, [accelerationScalar, accelerationScalar]);
		}

		// force
		vec2.add( temp, temp, this.velocity );
		const f = 1 - this.config.friction;
		vec2.mul( temp, temp, [f, f]);

		// velocity
		const velocityScalar = this.config.maxVelocity / vec2.length( temp );
		if ( velocityScalar < 1 ) {
			vec2.mul( this.velocity, temp, [velocityScalar, velocityScalar]);
		} else {
			vec2.copy( this.velocity, temp );
		}

		// delta correction
		vec2.mul( temp, this.velocity, [delta, delta]);

		// output
		vec2.add( this.current, this.current, temp );
	}
}
