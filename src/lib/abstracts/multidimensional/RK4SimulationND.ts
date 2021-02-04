/* eslint-disable @typescript-eslint/no-explicit-any */
import SimulationND, { SimulationNDState } from './SimulationND';


export type RK4DerivativeND = [dx: Float32Array, dv: Float32Array];


const temp = new Float32Array( 3 );
const dxdt = new Float32Array( 3 );
const dvdt = new Float32Array( 3 );
const zero = new Float32Array( 3 );

const tempA: RK4DerivativeND = [
	new Float32Array( 3 ),
	new Float32Array( 3 ),
];
const tempB: RK4DerivativeND = [
	new Float32Array( 3 ),
	new Float32Array( 3 ),
];
const tempC: RK4DerivativeND = [
	new Float32Array( 3 ),
	new Float32Array( 3 ),
];
const tempD: RK4DerivativeND = [
	new Float32Array( 3 ),
	new Float32Array( 3 ),
];
const tempState: SimulationNDState = [
	new Float32Array( 3 ),
	new Float32Array( 3 ),
];


export default abstract class RK4SimulationND<V> extends SimulationND<V> {
	protected integrate( deltaTime: number ): void {
		const dt = deltaTime / 1000;

		this.evaluate( tempA, 0, [zero, zero]);
		this.evaluate( tempB, dt * .5, tempA );
		this.evaluate( tempC, dt * .5, tempB );
		this.evaluate( tempD, dt, tempC );

		this.v.add( dxdt, tempB[0], tempC[0]);
		this.v.scaleAndAdd( dxdt, tempA[0], dxdt, 2 );
		this.v.add( dxdt, dxdt, tempD[0]);
		this.v.scale( dxdt, dxdt, 1 / 6 );

		this.v.add( dvdt, tempB[1], tempC[1]);
		this.v.scaleAndAdd( dvdt, tempA[1], dvdt, 2 );
		this.v.add( dvdt, dvdt, tempD[1]);
		this.v.scale( dvdt, dvdt, 1 / 6 );

		// velocity
		this.v.scaleAndAdd( temp, this.state[1], dvdt, dt );

		if ( this.v.len( temp ) > this.restDelta ) {
			this.v.copy( this.state[1], temp );
		} else {
			this.v.zero( this.state[1]);
			this.isResting = true;
		}

		this.v.scaleAndAdd( this.state[0], this.state[0], dxdt, dt );
	}


	private evaluate( out: RK4DerivativeND, dt: number, d: RK4DerivativeND ): void {
		this.v.scaleAndAdd( tempState[0], this.state[0], d[0], dt );
		this.v.scaleAndAdd( tempState[1], this.state[1], d[1], dt );

		this.computeForce( temp, tempState );
		this.v.copy( out[0], tempState[1]);
		this.v.scale( out[1], temp, 1 / this.mass );
	}
}
