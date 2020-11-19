import defaultWorld from '../defaultWorld';
import Stepable from './Stepable';


export interface StepperProps {
	maxTimestep: number;
	maxStepCount: number;
	autoStep: boolean;
}


export default abstract class Stepper implements Stepable {
	private lastFrame = 0;
	private maxTimestep: number;
	private maxStepCount: number;
	public isResting = false;

	constructor({
		maxTimestep = 17,
		maxStepCount = 8,
		autoStep = true,
	}: Partial<StepperProps> = {}) {
		this.maxTimestep = maxTimestep;
		this.maxStepCount = maxStepCount;

		if ( autoStep ) defaultWorld.add( this );
	}


	public step( time: number ): void {
		if ( !this.isResting ) {
			let simulationTime = this.lastFrame;
			let stepCount = 0;

			while ( simulationTime < time && stepCount < this.maxStepCount ) {
				const deltaTime = Math.min( time - simulationTime, this.maxTimestep );

				this.integrate( deltaTime );

				simulationTime += deltaTime;
				stepCount += 1;
			}
		}

		this.lastFrame = time;
	}


	// eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
	protected integrate( deltaTime: number ): void {
		// implementation
	}


	public stop(): void {
		defaultWorld.remove( this );
	}
}

