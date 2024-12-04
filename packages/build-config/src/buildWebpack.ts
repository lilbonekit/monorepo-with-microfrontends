import { WebpackConfiguration } from 'webpack-dev-server'
import { buildDevServer } from './buildDevServer'
import { buildLoaders } from './buildLoaders'
import { buildPlugin } from './buildPlugins'
import { buildResolvers } from './buildResolver'
import { BuildOptions } from './types/types'

export function buildWebpack(options: BuildOptions): WebpackConfiguration {
	const { mode, paths } = options
	const isDev = mode === 'development'

	return {
		mode: mode ?? 'development',
		entry: paths.entry,
		output: {
			path: paths.output,
			filename: '[name].[contenthash].js',
			clean: true,
		},
		plugins: buildPlugin(options),
		module: {
			rules: buildLoaders(options),
		},
		resolve: buildResolvers(options),
		devtool: isDev ? 'inline-source-map' : 'source-map',
		devServer: isDev ? buildDevServer(options) : undefined,
	}
}
