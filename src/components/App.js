import { useState } from 'react';
import '../styles/App.css';
import Game from './Game.js';

function App() {
	let size = 30;
	let [rows] = useState(Math.floor((window.innerHeight - 180) / size));
	let [cols] = useState(Math.floor((window.innerWidth - 40) / size));
	// window.addEventListener('resize', () => {
	// 	setRows(Math.floor((window.innerHeight - 180) / size));
	// 	setCols(Math.floor((window.innerWidth - 40) / size));
	// });
	return (
		<div className="App">
			<h1 style={{ marginTop: '10px', fontSize: 80, fontWeight: 800 }}>
				Game Of Life
			</h1>
			<Game size={size} rows={rows} cols={cols} steps={15} />
		</div>
	);
}

export default App;
