// entry point
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
const root = document.getElementById('root')
import { router } from '@/router/Router'

if (!root) {
	throw new Error('root not found')
}

const container = createRoot(root)

container.render(<RouterProvider router={router} />)
