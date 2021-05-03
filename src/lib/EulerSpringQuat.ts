/* eslint-disable @typescript-eslint/no-explicit-any */
import { vec4, quat } from 'gl-matrix';

import EulerSpringND, {
	EulerSpringNDProps,
} from './abstracts/multidimensional/EulerSpringND';

export default class EulerSpringQuat extends EulerSpringND<quat> {
	constructor( props: Partial<Omit<EulerSpringNDProps<quat>, 'vector'>> ) {
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
