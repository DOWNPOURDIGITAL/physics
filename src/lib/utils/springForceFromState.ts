import { SimulationNDState } from '../abstracts/multidimensional/SimulationND';
import { VectorClass } from '../abstracts/multidimensional/Vector';
import { SimulationState } from '../abstracts/Simulation';


export function springForceFromState(
	state: SimulationState,
	target: number,
	k: number,
	b: number,
): number {
	const x = state[0] - target;
	const v = state[1];

	return -( k * x ) - ( b * v );
}


const temp = new Float32Array( 4 );
const temp2 = new Float32Array( 4 );

export function springForceFromStateND(
	out: Float32Array,
	v: VectorClass,
	state: SimulationNDState,
	target: Float32Array,
	k: number,
	b: number,
): void {
	// x
	v.sub( temp, state[0], target );
	// -kx
	v.scale( temp, temp, -k );

	// bv
	v.scale( temp2, state[1], b );

	v.sub( out, temp, temp2 );
}
