/* eslint-disable @typescript-eslint/no-explicit-any */
import { vec2 } from 'gl-matrix';

import RK4SpringND, { RK4SpringNDProps } from './abstracts/multidimensional/RK4SpringND';


export default class RK4Spring2D extends RK4SpringND<vec2> {
	constructor( props: Partial<Omit<RK4SpringNDProps<vec2>, 'vector'>> ) {
		super({
			...props,
			vector: vec2 as any,
		});
	}
}
