import Simulation, { SimulationState } from './Simulation';


export type RK4Derivative = [dx: number, dv: number];


export default abstract class RK4Simulation extends Simulation {
	protected integrate( deltaTime: number ): void {
		const dt = deltaTime / 1000;

		const a = this.evaluate( 0, [0, 0]);
		const b = this.evaluate( dt * .5, a );
		const c = this.evaluate( dt * .5, b );
		const d = this.evaluate( dt, c );

		const dxdt = ( 1 / 6 ) * ( a[0] + 2 * ( b[0] + c[0]) + d[0]);
		const dvdt = ( 1 / 6 ) * ( a[1] + 2 * ( b[1] + c[1]) + d[1]);

		const velocity = this.state[1] + dvdt * dt;

		this.state[0] += dxdt * dt;
		this.state[1] = velocity;

		this.isResting = this.checkResting();

		if ( this.isResting ) {
			this.state[1] = 0;
		}
	}


	private evaluate( dt: number, d: RK4Derivative ): RK4Derivative {
		const state: SimulationState = [
			this.state[0] + d[0] * dt,
			this.state[1] + d[1] * dt,
		];

		return [
			state[1],
			this.computeForce( state ) / this.mass,
		];
	}
}
