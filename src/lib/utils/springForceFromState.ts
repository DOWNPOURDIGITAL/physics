import { SimulationState } from '../abstracts/Simulation';


export default function springForceFromState(
	state: SimulationState,
	target: number,
	k: number,
	b: number,
): number {
	const x = state[0] - target;
	const v = state[1];

	return -( k * x ) - ( b * v );
}
