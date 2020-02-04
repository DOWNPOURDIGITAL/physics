import { Computable1D, Stepable } from './Computable';
import { Particle1DConfig } from './configs';
import World from './World';


export default class EulerParticle implements Stepable, Computable1D {
	private value = 0;
	public config: Particle1DConfig;
	public enabled = true;
	public force = 0;
	public velocity = 0;


	constructor( config: Partial<Particle1DConfig> = {}) {
		this.config = {
			value: 0,
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


	get(): number {
		return Math.round( this.value * this.config.precision )
			/ this.config.precision;
	}


	set( val: number ): void {
		this.value = val;
	}


	add( val: number ): void {
		this.velocity += val;
	}


	reset(): void {
		this.resetTo( this.config.value );
	}


	resetTo( val: number ): void {
		this.value = val;
		this.velocity = 0;
	}


	setForce( val: number ): void {
		this.force = val;
	}


	addForce( val: number ): void {
		this.force += val;
	}


	unschedule(): void {
		World.remove( this );
	}


	step( delta: number ): void {
		this.force *= ( 1 - this.config.friction );
		const acceleration = this.force * ( 1 / this.config.mass );
		const force = ( this.velocity + acceleration ) * ( 1 - this.config.friction );

		this.velocity = Math.min(
			Math.abs( force ),
			this.config.maxVelocity,
		) * Math.sign( force );

		this.value += this.velocity * delta;
	}
}
