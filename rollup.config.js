/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
	external: ['gl-matrix'],

	input: ['./src/physics.ts', './src/multi.ts'],

	output: [
		{
			dir: 'dist/esm',
			format: 'esm',
			chunkFileNames: '[hash].js',
		},
		{
			dir: 'dist/cjs',
			format: 'cjs',
			chunkFileNames: '[hash].js',
		},
	],

	cache: false,

	plugins: [
		terser({
			format: {
				comments: false,
			},
		}),
		typescript({
			tsconfigOverride: {
				compilerOptions: {
					module: 'esnext',
				},
			},
			clean: true,
		}),
	],
};
