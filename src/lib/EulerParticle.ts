import './configs';
import './Computable';
import World from './World';


export default class EulerParticle implements Stepable {
	private value: number = 0;
	private config: InternalParticleConfig;
	public enabled: boolean = true;
	public force: number = 0;
	public velocity: number = 0;


	constructor( config: ParticleConfig = {}) {
		this.config = Object.assign(
			{
				value: 0,
				mass: 1,
				friction: .5,
				precision: 100000,
				maxVelocity: Infinity,
			},
			config,
		);

		this.reset();

		if ( config.autoStep !== false ) World.add( this );
	}


	get() {
		return Math.round( this.value * this.config.precision ) / this.config.precision;
	}


	set( val: number ) {
		this.value = val;
	}


	add( val: number ) {
		this.velocity += val;
	}


	reset() {
		this.resetTo( this.config.value );
	}


	resetTo( val: number ) {
		this.value = val;
		this.velocity = 0;
	}


	setForce( val: number ) {
		this.force = val;
	}


	addForce( val: number ) {
		this.force += val;
	}


	step( delta: number ) {
		this.force *= ( 1 - this.config.friction );
		const acceleration = this.force * ( 1 / this.config.mass );
		const force = ( this.velocity + acceleration ) * ( 1 - this.config.friction );

		this.velocity = Math.min(
			Math.abs( force ),
			this.config.maxVelocity,
		) * Math.sign( force );

		this.value += this.velocity * delta;
	}
}
