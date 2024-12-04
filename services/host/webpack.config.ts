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
	SHOP_REMOTE_URL: string
	ADMIN_REMOTE_URL: string
}

export default (env: EnvVariables) => {
	const { mode, port, analyzer, platform } = env
	const paths: BuildPaths = {
		output: path.resolve(__dirname, 'build'),
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src'),
		public: path.resolve(__dirname, 'public'),
	}

	const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost:3001'
	const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? 'http://localhost:3002'

	const config: webpack.Configuration = buildWebpack({
		port: port ?? 3000,
		mode: mode ?? 'development',
		platform: platform ?? 'desktop',
		analyzer,
		paths,
	})

	config.plugins.push(
		new webpack.container.ModuleFederationPlugin({
			name: 'host',
			filename: 'remoteEntry.js',
			remotes: {
				shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
				admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
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
