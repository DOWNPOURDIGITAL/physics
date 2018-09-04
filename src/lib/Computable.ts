interface Computable {
	get: () => number;
	set: ( value: number ) => void;
}

export interface Stepable extends Computable {
	step: ( delta: number, time: number ) => void;
	enabled: boolean;
}
