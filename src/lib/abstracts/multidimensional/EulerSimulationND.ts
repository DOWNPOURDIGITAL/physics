/* eslint-disable @typescript-eslint/no-explicit-any */
import SimulationND from './SimulationND';


const temp = new Float32Array( 3 );


export default abstract class EulerSimulationND<V> extends SimulationND<V> {
	protected integrate( deltaTime: number ): void {
		const dt = deltaTime / 1000;

		this.computeForce( temp, this.state );

		// acceleration
		this.v.scale( temp, temp, 1 / this.mass );

		// velocity
		this.v.scaleAndAdd( temp, this.state[1], temp, dt );

		if ( this.v.len( temp ) > this.restDelta ) {
			this.v.copy( this.state[1], temp );
		} else {
			this.v.zero( this.state[1]);
			this.isResting = true;
		}

		this.v.scaleAndAdd( this.state[0], this.state[0], this.state[1], dt );
	}
}
