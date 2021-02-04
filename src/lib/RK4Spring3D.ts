/* eslint-disable @typescript-eslint/no-explicit-any */
import { vec3 } from 'gl-matrix';

import RK4SpringND, { RK4SpringNDProps } from './abstracts/multidimensional/RK4SpringND';


export default class RK4Spring3D extends RK4SpringND<vec3> {
	constructor( props: Partial<Omit<RK4SpringNDProps<vec3>, 'vector'>> ) {
		super({
			...props,
			vector: vec3 as any,
		});
	}
}
