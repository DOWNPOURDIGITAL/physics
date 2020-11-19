import Stepable from './abstracts/Stepable';
import defaultWorld from './defaultWorld';
import { EulerSpringProps } from './EulerSpring';
import { RK4SpringProps } from './RK4Spring';


type PassthroughProps = Partial<EulerSpringProps | RK4SpringProps>;


export default class Passthrough implements Stepable {
	private position: number;
	private target: number;
	private initial: number;
	public isResting = false;


	constructor({
		value = 0,
		autoStep = true,
	}: PassthroughProps = {}) {
		this.initial = value;
		this.reset();

		if ( autoStep ) defaultWorld.add( this );
	}


	public step(): void {
		this.isResting = ( this.position === this.target );
		this.position = this.target;
	}


	public set( value: number ): void {
		this.target = value;
	}


	public get(): number {
		return this.position;
	}


	public reset(): void {
		this.resetTo( this.initial );
	}


	public resetTo( value: number ): void {
		this.target = value;
		this.position = value;
	}
}
