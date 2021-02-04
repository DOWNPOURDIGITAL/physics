import Stepable from './abstracts/Stepable';
import defaultWorld from './defaultWorld';


export interface LinearMotionProps {
	value: number;
	speed: number;
	autoStep: boolean;
}


export default class LinearMotion implements Stepable {
	private target = 0;
	private initial = 0;
	private position = 0;
	private lastFrame = 0;
	public speed: number;
	public isResting = false;


	constructor({
		value = 0,
		speed = 1,
		autoStep = true,
	}: Partial<LinearMotionProps> = {}) {
		this.initial = value;
		this.speed = speed;

		this.reset();

		if ( autoStep ) defaultWorld.add( this );
	}


	public step( time: number ): void {
		if ( this.target !== this.position ) {
			const delta = ( time - this.lastFrame ) / 1000;
			const difference = this.target - this.position;

			this.position += Math.min(
				Math.abs( difference ),
				this.speed * delta,
			) * Math.sign( difference );

			this.isResting = false;
		} else {
			this.isResting = true;
		}

		this.lastFrame = time;
	}


	public get(): number {
		return this.position;
	}


	public set( value: number ): void {
		this.target = value;
	}


	public reset(): void {
		this.resetTo( this.initial );
	}


	public resetTo( value: number ): void {
		this.position = value;
		this.target = value;
	}


	public stop(): void {
		defaultWorld.remove( this );
	}
}
