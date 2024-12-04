import { ModuleOptions } from 'webpack'
import { BuildOptions } from './types/types'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshTypeScript from 'react-refresh-typescript'
import { buildBabelLoader } from './babel/buildBabelLoader'

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
	const isDev = options.mode === 'development'

	const assetLoader = {
		test: /\.(png|jpg|gif)$/i,
		type: 'asset/resource',
	}

	const svgLoader = {
		test: /\.svg$/,
		// icon: true for width/height adjustment
		use: [{ loader: '@svgr/webpack', options: { icon: true } }],
	}

	const cssLoader = {
		loader: 'css-loader',
		options: {
			modules: {
				localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
			},
		},
	}

	const scssLoader = {
		// 'css-loader' compile CSS in CommonJS
		test: /\.s[ac]ss$/i,
		use: [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			cssLoader,
			{
				loader: 'sass-loader',
				options: {
					sassOptions: {
						silenceDeprecations: ['legacy-js-api'],
					},
				},
			},
		],
	}

	const tsLoader = {
		test: /\.tsx?$/,
		use: {
			// ts-loader is able to work with JSX by default
			// If it's not installed it requires to install babel-loader
			loader: 'ts-loader',
			options: {
				// For not check types
				transpileOnly: true,
				getCustomTransformers: () => ({
					before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
				}),
			},
		},
		exclude: /node_modules/,
	}

	const babelLoader = buildBabelLoader(options)

	return [
		assetLoader,
		scssLoader,
		tsLoader,
		// babelLoader,
		svgLoader,
	]
}
