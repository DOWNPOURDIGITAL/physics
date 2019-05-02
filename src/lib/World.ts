import { Stepable } from './Computable';


class World {
	private entities: Stepable[] = [];
	private lastFrameTime: number = 0;
	private nextFrameReference?: number;


	add( s: Stepable ) {
		this.entities.push( s );
	}


	remove( s: Stepable ) {
		if ( this.entities.includes( s ) ) {
			this.entities.splice( this.entities.findIndex( e => e === s ), 1 );
		}
	}


	step( delta: number, time: number ) {
		this.entities.forEach( s => s.enabled && s.step( delta, time ) );
	}


	loop() {
		const currentFrameTime = performance.now();
		const delta = ( currentFrameTime - this.lastFrameTime ) / 16.667;

		this.step( delta, currentFrameTime );

		this.nextFrameReference = requestAnimationFrame( () => this.loop() );
		this.lastFrameTime = currentFrameTime;
	}


	start() {
		this.lastFrameTime = performance.now();

		this.loop();
	}


	stop() {
		if ( this.nextFrameReference ) cancelAnimationFrame( this.nextFrameReference );
	}
}

export default new World();
