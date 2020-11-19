import { loop, update } from '@downpourdigital/scheduler';

import World from './World';


const defaultWorld = new World();

loop( () => [
	update( ( delta, time ) => defaultWorld.step( time ) ),
]);

export default defaultWorld;
