import type {
	vec2,
} from 'gl-matrix';


export type VectorClass = {
	zero: typeof vec2.zero;
	add: typeof vec2.add;
	sub: typeof vec2.sub;
	div: typeof vec2.div;
	mul: typeof vec2.mul;
	len: typeof vec2.len;
	scale: typeof vec2.scale;
	scaleAndAdd: typeof vec2.scaleAndAdd;
	copy: typeof vec2.copy;
	equals: typeof vec2.equals;
	create: () => Float32Array;
};
