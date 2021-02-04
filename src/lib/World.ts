import Stepable from './abstracts/Stepable';


export default class World {
	private entities: Stepable[] = [];

	public add( s: Stepable ): void {
		this.entities.push( s );
	}


	public remove( s: Stepable ): void {
		if ( this.entities.includes( s ) ) {
			this.entities.splice( this.entities.findIndex( e => e === s ), 1 );
		}
	}


	public step( time: number ): void {
		this.entities.forEach( e => {
			e.step( time );
		});
	}
}
