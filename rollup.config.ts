import sourcemaps from 'rollup-plugin-sourcemaps';
import typescript from '@rollup/plugin-typescript';

export default [
	{
		input: 'src/index.ts',
		output: {
			file: 'dist/qreader.js',
			format: 'esm',
			sourcemap: false,
		},
		plugins: [typescript(), sourcemaps()],
	},
];
