import Vec2, { Vector2D } from './Vec2';


export interface Computable1D {
	get: () => number;
	set: ( value: number ) => void;
}

export interface Computable2D {
	get: () => Vector2D;
	set: ( value: Vector2D ) => void;
}

export interface Stepable {
	step: ( delta: number, time: number ) => void;
	enabled: boolean;
}
