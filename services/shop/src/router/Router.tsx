import { App } from '@/components/App'
import { LazyShop } from '@/pages'
import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const routes = [
	{
		path: '/shop',
		element: <App />,
		children: [
			{
				path: '/shop/main',
				element: (
					<Suspense fallback={<p>Loading...</p>}>
						<LazyShop />
					</Suspense>
				),
			},
			{
				path: '/shop/second',
				element: (
					<Suspense fallback={<p>Loading...</p>}>
						<h4 style={{ color: 'red' }}>second subpage</h4>
					</Suspense>
				),
			},
		],
	},
]

export const router = createBrowserRouter(routes)

export default routes
