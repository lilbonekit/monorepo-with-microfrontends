import path from 'path'
import webpack from 'webpack'
import {
	BuildMode,
	BuildPaths,
	BuildPlatform,
	buildWebpack,
} from '@packages/build-config'
import packageJson from './package.json'

interface EnvVariables {
	mode: BuildMode
	port: number
	analyzer?: boolean
	platform?: BuildPlatform
}

export default ({ mode, port, analyzer, platform }: EnvVariables) => {
	const paths: BuildPaths = {
		output: path.resolve(__dirname, 'build'),
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src'),
		public: path.resolve(__dirname, 'public'),
	}

	const config: webpack.Configuration = buildWebpack({
		port: port ?? 3001,
		mode: mode ?? 'development',
		platform: platform ?? 'desktop',
		analyzer,
		paths,
	})

	config.plugins.push(
		new webpack.container.ModuleFederationPlugin({
			name: 'shop',
			filename: 'remoteEntry.js',
			exposes: {
				'./Router': './src/router/Router.tsx',
			},
			shared: {
				...packageJson.dependencies,
				'react': {
					eager: true, // opposite to LazyLoading
					requiredVersion: packageJson.dependencies['react'],
				},
				'react-router-dom': {
					eager: true,
					requiredVersion: packageJson.dependencies['react-router-dom'],
				},
				'react-dom': {
					eager: true,
					requiredVersion: packageJson.dependencies['react-dom'],
				},
			},
		})
	)

	return config
}
