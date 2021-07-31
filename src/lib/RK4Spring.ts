import RK4Simulation from './abstracts/RK4Simulation';
import { SimulationProps, SimulationState } from './abstracts/Simulation';
import springForceFromState from './utils/springForceFromState';


export interface RK4SpringProps extends SimulationProps {
	stiffness: number;
	damping: number;
}


export default class RK4Spring extends RK4Simulation {
	private target = 0;
	public stiffness: number;
	public damping: number;


	constructor({
		stiffness = 250,
		damping = 15,
		...rest
	}: Partial<RK4SpringProps> = {}) {
		super( rest );

		this.stiffness = stiffness;
		this.damping = damping;
		// eslint-disable-next-line prefer-destructuring
		this.target = this.state[0];
	}


	public step( time: number ): void {
		super.step( time );

		// ensure that the springs resting position is at the target
		if ( this.isResting ) this.state[0] = this.target;
	}


	protected computeForce( state: SimulationState ): number {
		return springForceFromState(
			state, this.target, this.stiffness, this.damping,
		);
	}


	protected checkResting(): boolean {
		return Math.abs( this.state[1]) < this.restDelta
			&& Math.abs( this.state[0] - this.target ) < this.restDelta;
	}


	public set( target: number ): void {
		if ( target !== this.target ) {
			this.target = target;
			this.isResting = false;
		}
	}


	public resetTo( value: number ): void {
		super.resetTo( value );
		this.target = value;
	}
}
