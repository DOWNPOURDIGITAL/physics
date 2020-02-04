import { Computable1D, Stepable } from './Computable';
import { ConstantMotion1DConfig, Spring1DConfig } from './configs';
import World from './World';


interface PassthroughConfig {
	value: number;
	autoStep: boolean;
}


export default class Passthrough implements Stepable, Computable1D {
	private current = 0;
	private target = 0;
	public enabled = true;
	public config: PassthroughConfig;
	public velocity = 0;


	constructor(
		config: Partial<Spring1DConfig|ConstantMotion1DConfig|PassthroughConfig> =
		{}
	) {
		this.config = {
			value: 0,
			autoStep: true,
			...config,
		};

		this.reset();

		if ( this.config.autoStep ) World.add( this );
	}


	reset(): void {
		this.resetTo( this.config.value );
	}


	resetTo( value: number ): void {
		this.current = value;
		this.target = value;
	}


	get(): number {
		return this.current;
	}


	set( value: number ): void {
		this.target = value;
	}


	unschedule(): void {
		World.remove( this );
	}


	step(): void {
		this.current = this.target;
	}
}
