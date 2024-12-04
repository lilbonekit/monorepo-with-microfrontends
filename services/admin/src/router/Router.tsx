import { App } from '@/components/App'
import { LazyAbout } from '@/pages'
import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const routes = [
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/about',
				element: (
					<Suspense fallback={<p>Loading...</p>}>
						<LazyAbout />
					</Suspense>
				),
			},
		],
	},
]

export const router = createBrowserRouter(routes)

export default routes
