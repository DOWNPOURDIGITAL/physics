/* eslint-disable @typescript-eslint/no-explicit-any */
import { vec3 } from 'gl-matrix';

import EulerSpringND, { EulerSpringNDProps } from './abstracts/multidimensional/EulerSpringND';


export default class EulerSpring3D extends EulerSpringND<vec3> {
	constructor( props: Partial<Omit<EulerSpringNDProps<vec3>, 'vector'>> ) {
		super({
			...props,
			vector: vec3 as any,
		});
	}
}
