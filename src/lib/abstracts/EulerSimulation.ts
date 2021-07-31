import Simulation from './Simulation';


export default abstract class EulerSimulation extends Simulation {
	protected integrate( deltaTime: number ): void {
		const dt = deltaTime / 1000;

		const acceleration = ( this.computeForce( this.state ) / this.mass );
		const velocity = this.state[1] + acceleration * dt;

		this.state[0] += velocity * dt;
		this.state[1] = velocity;

		this.isResting = this.checkResting();

		if ( this.isResting ) {
			this.state[1] = 0;
		}
	}
}
