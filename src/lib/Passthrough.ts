import { Stepable, Computable1D } from './Computable';
import { Spring1DConfig, ConstantMotion1DConfig } from './configs';
import World from './World';


interface PassthroughConfig {
	value?: number;
	autoStep?: boolean;
}


interface InternalPassthroughConfig {
	value: number;
}


export default class Passthrough implements Stepable, Computable1D {
	private current: number = 0;
	private target: number = 0;
	public enabled: boolean = true;
	public config: InternalPassthroughConfig;
	public velocity: number = 0;


	constructor( config: Spring1DConfig | ConstantMotion1DConfig | PassthroughConfig = {}) {
		this.config = Object.assign(
			{
				value: 0,
			},
			config,
		);

		this.reset();

		if ( config.autoStep !== false ) World.add( this );
	}


	reset() {
		this.resetTo( this.config.value );
	}


	resetTo( value: number ) {
		this.current = value;
		this.target = value;
	}


	get(): number {
		return this.current;
	}


	set( value: number ) {
		this.target = value;
	}


	unschedule() {
		World.remove( this );
	}


	step() {
		this.current = this.target;
	}
}
