import { SimulationNDState } from '../abstracts/multidimensional/SimulationND';
import { VectorClass } from '../abstracts/multidimensional/Vector';

const temp = new Float32Array( 4 );
const temp2 = new Float32Array( 4 );

export default function springForceFromStateND(
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
