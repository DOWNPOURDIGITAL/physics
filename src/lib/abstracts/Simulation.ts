import Stepper, { StepperProps } from './Stepper';


export type SimulationState = [x: number, v: number];


export interface SimulationProps extends StepperProps {
	value: number;
	velocity: number;
	mass: number;
	restDelta: number;
}


export default abstract class Simulation extends Stepper {
	private initial: number;
	protected restDelta: number;
	protected state: SimulationState;
	public mass: number;


	constructor({
		value = 0,
		velocity = 0,
		mass = 1,
		restDelta = .0005,
		...rest
	}: Partial<SimulationProps> = {}) {
		super( rest );

		this.mass = mass;
		this.restDelta = restDelta;

		this.state = [value, velocity];
		this.initial = value;
	}


	// eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
	protected computeForce( state: SimulationState ): number {
		return 0;
	}


	protected checkResting(): boolean {
		return Math.abs( this.state[1]) < this.restDelta;
	}


	public get(): number {
		return this.state[0];
	}


	public getVelocity(): number {
		return this.state[1];
	}


	public setVelocity( value: number ): void {
		this.state[1] = value;
	}


	public resetTo( value: number ): void {
		this.state[0] = value;
		this.state[1] = 0;
	}


	public reset(): void {
		this.resetTo( this.initial );
	}
}
