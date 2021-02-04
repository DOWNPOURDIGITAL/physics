export default interface Stepable {
	step: ( time: number ) => void;
	isResting: boolean;
	stop: () => void;
}
