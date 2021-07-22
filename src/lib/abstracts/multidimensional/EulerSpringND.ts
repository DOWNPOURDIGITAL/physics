/* eslint-disable @typescript-eslint/no-explicit-any */
import springForceFromStateND from '../../utils/springForceFromStateND';
import EulerSimulationND from './EulerSimulationND';
import { SimulationNDProps, SimulationNDState } from './SimulationND';


export interface EulerSpringNDProps<V> extends SimulationNDProps<V> {
	stiffness: number;
	damping: number;
}


export default abstract class EulerSpringND<V> extends EulerSimulationND<V> {
	protected target: Float32Array;
	public stiffness: number;
	public damping: number;


	constructor({
		stiffness = 250,
		damping = 15,
		...rest
	}: Partial<EulerSpringNDProps<V>> = {}) {
		super( rest );

		this.stiffness = stiffness;
		this.damping = damping;

		this.target = this.v.create();
		if ( rest.value ) {
			this.v.copy( this.target, rest.value as any );
		}
	}


	public step( time: number ): void {
		super.step( time );

		// ensure that the springs resting position is at the target
		if ( this.isResting ) {
			this.v.copy( this.state[0], this.target );
		}
	}


	protected computeForce( out: Float32Array, state: SimulationNDState ): void {
		springForceFromStateND(
			out, this.v,
			state, this.target, this.stiffness, this.damping,
		);
	}


	public set( target: V ): void {
		if ( !this.v.equals( this.target, target as any ) ) {
			this.v.copy( this.target, target as any );
			this.isResting = false;
		}
	}


	public resetTo( value: V ): void {
		super.resetTo( value );
		this.v.copy( this.target, value as any );
	}
}
