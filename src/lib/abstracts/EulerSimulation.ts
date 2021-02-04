import Simulation from './Simulation';


export default abstract class EulerSimulation extends Simulation {
	protected integrate( deltaTime: number ): void {
		const dt = deltaTime / 1000;

		const acceleration = ( this.computeForce( this.state ) / this.mass );
		const velocity = this.state[1] + acceleration * dt;

		if ( Math.abs( velocity ) > this.restDelta ) {
			this.state[1] = velocity;
		} else {
			this.state[1] = 0;
			this.isResting = true;
		}

		this.state[0] += velocity * dt;
	}
}
