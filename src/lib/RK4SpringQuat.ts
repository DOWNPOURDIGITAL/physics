/* eslint-disable @typescript-eslint/no-explicit-any */
import { vec4, quat } from 'gl-matrix';

import RK4SpringND, {
	RK4SpringNDProps,
} from './abstracts/multidimensional/RK4SpringND';

export default class EulerSpringQuat extends RK4SpringND<quat> {
	constructor( props: Partial<Omit<RK4SpringNDProps<quat>, 'vector'>> ) {
		super({
			...props,
			vector: vec4 as any,
		});

		quat.identity( this.state[0]);
	}

	step( time: number ): void {
		const dot = quat.dot( this.state[0], this.target );

		if ( dot < 0 ) {
			quat.set(
				this.target,
				-this.target[0],
				-this.target[1],
				-this.target[2],
				-this.target[3],
			);
		}

		super.step( time );

		quat.normalize( this.state[0], this.state[0]);
		// quat.normalize( this.state[1], this.state[1]);
	}
}
