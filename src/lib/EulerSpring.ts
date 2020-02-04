import { Computable1D, Stepable } from './Computable';
import { Spring1DConfig } from './configs';
import World from './World';


export default class EulerSpring implements Stepable, Computable1D {
	private current = 0;
	private target = 0;
	public config: Spring1DConfig;
	public enabled = true;
	public velocity = 0;


	constructor( config: Partial<Spring1DConfig> = {}) {
		this.config = {
			value: 0,
			mass: 1,
			friction: .5,
			precision: 100000,
			stiffness: .2,
			maxVelocity: Infinity,
			maxAcceleration: Infinity,
			autoStep: true,
			...config,
		};

		this.reset();

		if ( this.config.autoStep ) World.add( this );
	}


	get(): number {
		return Math.round( this.current * this.config.precision )
			/ this.config.precision;
	}


	set( value: number ): void {
		this.target = value;
	}


	reset(): void {
		this.resetTo( this.config.value );
	}


	resetTo( value: number ): void {
		this.current = value;
		this.target = value;
		this.velocity = 0;
	}


	unschedule(): void {
		World.remove( this );
	}


	step( delta: number ): void {
		const a = ( this.target - this.current )
			* this.config.stiffness
			* ( 1 / this.config.mass );
		const acceleration = Math.min(
			Math.abs( a ),
			this.config.maxAcceleration,
		) * Math.sign( a );

		const force = ( this.velocity + acceleration ) * ( 1 - this.config.friction );

		this.velocity = Math.min(
			Math.abs( force ),
			this.config.maxVelocity,
		) * Math.sign( force );

		this.current += this.velocity * delta;
	}
}
