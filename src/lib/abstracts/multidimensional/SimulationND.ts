/* eslint-disable @typescript-eslint/no-explicit-any */
import defaultWorld from '../../defaultWorld';
import Stepper, { StepperProps } from '../Stepper';
import { VectorClass } from './Vector';


export type SimulationNDState = [x: Float32Array, v: Float32Array];


export interface SimulationNDProps<V> extends StepperProps {
	value: V;
	velocity: V;
	vector: VectorClass;
	mass: number;
	restDelta: number;
}


export default abstract class SimulationND<V> extends Stepper {
	private initial: Float32Array;
	protected restDelta: number;
	protected state: SimulationNDState;
	protected v: VectorClass;
	public mass: number;


	constructor({
		value,
		velocity,
		vector,
		mass = 1,
		restDelta = .0005,
		...rest
	}: Partial<SimulationNDProps<V>> = {}) {
		super( rest );

		this.v = vector;

		this.mass = mass;
		this.restDelta = restDelta;

		this.state = [
			this.v.create(),
			this.v.create(),
		];
		this.initial = this.v.create();

		if ( value ) {
			this.v.copy( this.state[0], value as any );
			this.v.copy( this.initial, value as any );
		}

		if ( velocity ) {
			this.v.copy( this.state[1], velocity as any );
		}
	}


	// eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
	protected computeForce( out: Float32Array, state: SimulationNDState ): void {
		// keep
	}


	protected checkResting(): boolean {
		return this.v.len( this.state[1]) < this.restDelta;
	}


	public get( out: V ): V {
		this.v.copy( out as any, this.state[0]);
		return out;
	}


	public read(): V {
		return this.state[0] as any;
	}


	public getVelocity( out: V ): void {
		this.v.copy( out as any, this.state[1]);
	}


	public readVelocity(): V {
		return this.state[1] as any;
	}


	public setVelocity( value: V ): void {
		this.v.copy( this.state[1], value as any );
	}


	public reset(): void {
		this.resetTo( this.initial as any );
	}


	public resetTo( value: V ): void {
		this.v.copy( this.state[0], value as any );
		this.v.zero( this.state[1]);
	}


	public stop(): void {
		defaultWorld.remove( this );
	}
}
