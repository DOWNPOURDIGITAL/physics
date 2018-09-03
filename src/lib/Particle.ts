export default class Particle implements Computable {
	public velocity: number = 0;
	private value: number = 0;


	get() {
		return this.value;
	}


	set( value: number ) {
		this.velocity = value;
	}


	step( delta: number ) {
		this.value += this.value * delta;
	}
}
