import {
	Stepable,
	Computable1D,
} from './Computable';
import {
	ConstantMotion1DConfig,
	InternalConstantMotion1DConfig,
} from './configs';

import World from './World';


export default class ConstantMotion implements Stepable, Computable1D {
	private current: number = 0;
	private target: number = 0;
	public config: InternalConstantMotion1DConfig;
	public enabled: boolean = true;


	constructor( config: ConstantMotion1DConfig = { speed: 1 }) {
		this.config = Object.assign(
			{
				value: 0,
				speed: 1,
				autoStep: true,
			},
			config,
		);

		this.reset();

		if ( this.config.autoStep ) World.add( this );
	}


	get() {
		return this.current;
	}


	set( value: number ) {
		this.target = value;
	}


	reset() {
		this.resetTo( this.config.value );
	}


	resetTo( value: number ) {
		this.current = value;
		this.target = value;
	}


	unschedule() {
		World.remove( this );
	}


	step( delta: number ) {
		if ( this.current !== this.target ) {
			const difference = this.target - this.current;

			this.current += Math.min(
				Math.abs( difference ),
				( this.config.speed / 60 ) * delta,
			) * Math.sign( difference );
		}
	}
}
