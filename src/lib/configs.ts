import { Vector2D } from './Vec2';


interface ParticleConfig {
	mass?: number;
	friction?: number;
	precision?: number;
	maxVelocity?: number;
	autoStep?: boolean;
}

interface InternalParticleConfig {
	mass: number;
	friction: number;
	precision: number;
	maxVelocity: number;
}

interface _1DConfig {
	value? : number;
}

interface _Internal1DConfig {
	value: number;
}

interface _2DConfig {
	value?: Vector2D;
}

interface _Internal2DConfig {
	value: Vector2D;
}

export interface Particle1DConfig extends ParticleConfig, _1DConfig {}

export interface Particle2DConfig extends ParticleConfig, _2DConfig {}

export interface InternalParticle1DConfig extends InternalParticleConfig, _Internal1DConfig {}

export interface InternalParticle2DConfig extends InternalParticleConfig, _Internal2DConfig {}


interface SpringConfig extends ParticleConfig {
	stiffness?: number;
	maxAcceleration?: number;
}

interface InternalSpringConfig extends InternalParticleConfig {
	stiffness: number;
	maxAcceleration: number;
}

export interface Spring1DConfig extends Particle1DConfig, SpringConfig {}

export interface Spring2DConfig extends Particle2DConfig, SpringConfig {}

export interface InternalSpring1DConfig extends InternalParticle1DConfig, InternalSpringConfig {}

export interface InternalSpring2DConfig extends InternalParticle2DConfig, InternalSpringConfig  {}


interface ConstantMotionConfig {
	speed: number;
	autoStep?: boolean;
}

export interface ConstantMotion1DConfig extends ConstantMotionConfig, _1DConfig {}

export interface InternalConstantMotion1DConfig extends ConstantMotionConfig, _Internal1DConfig { }
