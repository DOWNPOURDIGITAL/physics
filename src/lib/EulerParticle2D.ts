import { vec2 } from 'gl-matrix';

import { Computable2D, Stepable } from './Computable';
import { Particle2DConfig } from './configs';
import World from './World';

const zero = vec2.create();
const temp = vec2.create();

export default class EulerParticle2D implements Stepable, Computable2D {
	private value = vec2.create();
	public config: Particle2DConfig;
	public enabled = true;
	public force = vec2.create();
	public velocity = vec2.create();


	constructor( config: Partial<Particle2DConfig> = {}) {
		this.config = {
			value: zero,
			mass: 1,
			friction: .5,
			precision: 100000,
			maxVelocity: Infinity,
			autoStep: true,
			...config,
		};

		this.reset();

		if ( this.config.autoStep ) World.add( this );
	}


	get( out: vec2 ): void {
		vec2.set(
			out,
			Math.round( this.value[0] * this.config.precision )
			/ this.config.precision,
			Math.round( this.value[1] * this.config.precision )
			/ this.config.precision
		);
	}


	set( value: vec2 ): void {
		vec2.copy( this.value, value );
	}


	add( value: vec2 ): void {
		vec2.add( this.velocity, this.velocity, value );
	}


	setForce( value: vec2 ): void {
		vec2.copy( this.force, value );
	}


	addForce( value: vec2 ): void {
		vec2.add( this.force, this.force, value );
	}


	reset(): void {
		this.resetTo( this.config.value );
	}


	resetTo( value: vec2 ): void {
		vec2.copy( this.value, value );
		vec2.set( this.velocity, 0, 0 );
	}


	unschedule(): void {
		World.remove( this );
	}


	step( delta: number ): void {
		vec2.scale( this.force, this.force, 1 - this.config.friction );

		// acceleration
		vec2.scale( temp, this.force, 1 / this.config.mass );

		// force
		vec2.add( temp, temp, this.velocity );
		vec2.scale( temp, temp, 1 - this.config.friction );

		// velocity
		const velocityScalar = this.config.maxVelocity / vec2.length( temp );
		if ( velocityScalar < 1 ) {
			vec2.scale( this.velocity, temp, velocityScalar );
		} else {
			vec2.copy( this.velocity, temp );
		}

		// delta correction
		vec2.scale( temp, this.velocity, delta );

		// output
		vec2.add( this.value, this.value, temp );
	}
}
