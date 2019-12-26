import { vec2 } from 'gl-matrix';

export interface Computable1D {
	get: () => number;
	set: ( value: number ) => void;
}

export interface Computable2D {
	get: ( out: vec2 ) => void;
	set: ( value: vec2 ) => void;
}

export interface Stepable {
	step: ( delta: number, time: number ) => void;
	enabled: boolean;
}
