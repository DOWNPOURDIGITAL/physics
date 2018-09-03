interface ParticleConfig {
	value?: number;
	mass?: number;
	friction?: number;
	precision?: number;
	maxVelocity?: number;
	autoStep?: boolean;
}

interface InternalParticleConfig {
	value: number;
	mass: number;
	friction: number;
	precision: number;
	maxVelocity: number;
}


interface SpringConfig extends ParticleConfig {
	stiffness?: number;
	maxAcceleration?: number;
}

interface InternalSpringConfig extends InternalParticleConfig {
	stiffness: number;
	maxAcceleration: number;
}
