import { Configuration } from 'webpack'
import { BuildOptions } from '../types/types'
import { removeDataTestidBabelPlugin } from './removeDataTestidBabelPlugin'
import { PluginItem } from '@babel/core'

export function buildBabelLoader({ mode }: BuildOptions) {
	const isDev = mode === 'development'
	const isProd = mode === 'production'

	const babelPlugins: PluginItem[] = []

	if (isProd) {
		babelPlugins.push([
			removeDataTestidBabelPlugin,
			{
				props: ['data-testid'],
			},
		])
	}

	return {
		test: /\.tsx?$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: [
					'@babel/preset-env',
					'@babel/preset-typescript',
					[
						'@babel/preset-react',
						{
							runtime: isDev ? 'automatic' : 'classic',
						},
					],
				],
				plugins: babelPlugins.length ? babelPlugins : undefined,
			},
		},
	}
}
