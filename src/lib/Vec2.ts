export interface Vector2D {
	x: number;
	y: number;
}

export default class Vec2 implements Vector2D {
	public x: number = 0;
	public y: number = 0;


	constructor( input?: Vector2D ) {
		if ( input ) {
			this.add( input );
		}
	}


	add( vector: Vector2D ): Vec2 {
		this.x += vector.x;
		this.y += vector.y;

		return this;
	}


	length(): number {
		return Math.sqrt( ( this.x ** 2 ) + ( this.y ** 2 ) );
	}
}
