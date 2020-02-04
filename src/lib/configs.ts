import { vec2 } from 'gl-matrix';


interface ParticleConfig {
	mass: number;
	friction: number;
	precision: number;
	maxVelocity: number;
	autoStep: boolean;
}


interface Generic1DConfig {
	value: number;
}


interface Generic2DConfig {
	value: vec2;
}

export interface Particle1DConfig extends ParticleConfig, Generic1DConfig {}

export interface Particle2DConfig extends ParticleConfig, Generic2DConfig {}


interface SpringConfig extends ParticleConfig {
	stiffness: number;
	maxAcceleration: number;
}

export interface Spring1DConfig extends Particle1DConfig, SpringConfig {}

export interface Spring2DConfig extends Particle2DConfig, SpringConfig {}


interface ConstantMotionConfig {
	speed: number;
	autoStep: boolean;
}

export interface ConstantMotion1DConfig extends ConstantMotionConfig, Generic1DConfig {}
