import Vec2, { Vector2D } from './Vec2';


interface Computable {
	get: () => number;
	set: ( value: number ) => void;
}

interface Computable2D {
	get: () => Vec2;
	set: ( value: Vector2D ) => void;
}

export interface Stepable extends Computable {
	step: ( delta: number, time: number ) => void;
	enabled: boolean;
}

export interface Stepable2D extends Computable2D {
	step: ( delta: number, time: number ) => void;
	enabled: boolean;
}
