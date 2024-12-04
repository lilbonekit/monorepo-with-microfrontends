import { useState } from 'react'
import classes from './App.module.scss'
import { Link, Outlet } from 'react-router-dom'
// import kittyCat from '@/assets/cat.jpg'
// import Icon from '@/assets/icon.svg'
import { shopRoutes, adminRoutes } from '@packages/shared'

export const App = () => {
	const [counter, setCounter] = useState(0)

	const inc = () => setCounter((prev) => ++prev)
	const dec = () => setCounter((prev) => --prev)

	return (
		<div data-testid="App" className={classes.appContainer}>
			<div style={{ display: 'flex', gap: '10px' }}>
				<Link to={`${adminRoutes.about}`}>About</Link>
				<Link to={`/shop${shopRoutes.main}`}>Shop</Link>
				<Link to={`/shop${shopRoutes.second}`}>Shop second page</Link>
			</div>
			<h1>{counter}</h1>
			<h2 data-testid="platform">PLATFORM={__PLATFORM__}</h2>
			<button className={classes.button} onClick={inc}>
				inc
			</button>
			<button className={classes.button} onClick={dec}>
				dec
			</button>
			{/* <div>{kittyCat}</div> */}
			{/* <img width={100} height={100} src={kittyCat} alt="cat" /> */}
			<Outlet />
			{/* <Icon width={200} height={200} /> */}
		</div>
	)
}
