module.exports = {
	apps: [
		{
			name: 'clean-architecture',
			script: './src/index.js',
			node_args: ['--require=ts-node/register/transpile-only', '--require=tsconfig-paths/register'],
			env: {
				NODE_ENV: 'local'
			}
		}
	]
};
