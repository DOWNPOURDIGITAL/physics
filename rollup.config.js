import typescript from 'rollup-plugin-typescript2';

export default {
	input: './src/index.ts',

	output: [
		{
			file: 'dist/esm/physics.js',
			format: 'esm',
		},
		{
			file: 'dist/cjs/physics.js',
			format: 'cjs',
		},
	],

	plugins: [
		typescript(),
	],
};
