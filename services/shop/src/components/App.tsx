import { useState } from 'react'
import classes from './App.module.scss'
import { Link, Outlet } from 'react-router-dom'
// import kittyCat from '@/assets/cat.jpg'
// import Icon from '@/assets/icon.svg'

export const App = () => {
	const [counter, setCounter] = useState(0)

	const inc = () => setCounter((prev) => ++prev)
	const dec = () => setCounter((prev) => --prev)

	return (
		<div data-testid="App" className={classes.appContainer}>
			<h3>SHOP module</h3>
			<p>Penis holderssss</p>
			{/* <div>{kittyCat}</div> */}
			{/* <img width={100} height={100} src={kittyCat} alt="cat" /> */}
			<Outlet />
			{/* <Icon width={200} height={200} /> */}
		</div>
	)
}
