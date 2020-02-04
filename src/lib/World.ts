import { Stepable } from './Computable';


class World {
	private entities: Stepable[] = [];
	private lastFrameTime = 0;
	private nextFrameReference?: number;


	add( s: Stepable ): void {
		this.entities.push( s );
	}


	remove( s: Stepable ): void {
		if ( this.entities.includes( s ) ) {
			this.entities.splice( this.entities.findIndex( e => e === s ), 1 );
		}
	}


	step( delta: number, time: number ): void {
		this.entities.forEach( s => s.enabled && s.step( delta, time ) );
	}


	loop(): void {
		const currentFrameTime = performance.now();
		const delta = ( currentFrameTime - this.lastFrameTime ) / 16.667;

		this.step( delta, currentFrameTime );

		this.nextFrameReference = requestAnimationFrame( () => this.loop() );
		this.lastFrameTime = currentFrameTime;
	}


	start(): void {
		this.lastFrameTime = performance.now();

		this.loop();
	}


	stop(): void {
		if ( this.nextFrameReference ) cancelAnimationFrame( this.nextFrameReference );
	}
}

export default new World();
