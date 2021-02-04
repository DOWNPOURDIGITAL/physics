/* eslint-disable @typescript-eslint/no-explicit-any */
import { vec2 } from 'gl-matrix';

import EulerSpringND, { EulerSpringNDProps } from './abstracts/multidimensional/EulerSpringND';


export default class EulerSpring2D extends EulerSpringND<vec2> {
	constructor( props: Partial<Omit<EulerSpringNDProps<vec2>, 'vector'>> ) {
		super({
			...props,
			vector: vec2 as any,
		});
	}
}
