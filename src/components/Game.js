import React, { useEffect, useState, useRef } from 'react';
import '../styles/Game.css';
import HistoryStack from '../utilities/HistoryStack';
import Tips from './Tips.js';
import Board from './Board';

export default function Game(props) {
	const prevBtn = React.createRef();
	const [board, setBoard] = useState(makeEmptyBoard(props.rows, props.cols));
	const [cells, setCells] = useState([]);
	const [prev, setPrev] = useState(false);
	const [history] = useState(new HistoryStack(props.steps));
	const [running, setRunning] = useState(false);

	// update the cells whenever the board gets updated
	useEffect(() => {
		// do not recalculate the cells again
		if (!prev) {
			setCells(makeCells());
		}
		setPrev(false);
	}, [board]);

	// update the `Prev` button status whenever cells get updated
	useEffect(() => {
		if (history.size === 0) {
			prevBtn.current.disabled = true;
		} else {
			prevBtn.current.disabled = false;
		}
	}, [cells]);

	useInterval(
		() => {
			getNextBoard();
		},
		running ? 500 : null
	);

	return (
		<>
			<Tips width={props.size * props.cols} steps={props.steps} />
			<Board
				cells={cells}
				size={props.size}
				rows={props.rows}
				cols={props.cols}
				onClick={(x, y) => handleClick(x, y)}
			/>
			<div className="controls" style={{ width: props.size * props.cols }}>
				<button className="btn" ref={prevBtn} onClick={getPrevBoard}>
					Prev
				</button>
				<button className="btn" onClick={getNextBoard}>
					Next
				</button>
				<button className="btn" onClick={toggleRun}>
					{running ? 'Pause' : 'Run'}
				</button>
				<button className="btn" onClick={reset}>
					Reset
				</button>
			</div>
		</>
	);

	function handleClick(x, y) {
		if (x >= 0 && x < props.cols && y >= 0 && y <= props.rows) {
			board[y][x] = !board[y][x];
		}
		setCells(makeCells());
	}

	function makeCells() {
		let cells = [];
		for (let y = 0; y < props.rows; y++) {
			for (let x = 0; x < props.cols; x++) {
				if (board[y][x]) cells.push({ x, y, color: randomColor() });
			}
		}
		return cells;
	}

	function getNextBoard() {
		history.push({
			cells: cells.slice(),
			board: board.map((row) => row.slice()),
		});
		let newBoard = board.map((row) => row.slice());
		for (let y = 0; y < props.rows; y++) {
			for (let x = 0; x < props.cols; x++) {
				let neighbors = numberOfNeighbors(board, x, y);
				if (newBoard[y][x]) {
					newBoard[y][x] = neighbors === 2 || neighbors === 3;
				} else {
					if (!board[y][x] && neighbors === 3) {
						newBoard[y][x] = true;
					}
				}
			}
		}
		setBoard(newBoard);
	}

	function getPrevBoard() {
		if (history.size > 0) {
			let { cells, board } = history.pop();
			setPrev(true);
			setBoard(board);
			setCells(cells);
		}
	}

	function toggleRun() {
		setRunning((running) => !running);
	}

	function reset() {
		setRunning(false);
		setBoard(makeEmptyBoard(props.rows, props.cols));
		setCells([]);
		history.clear();
	}

	function numberOfNeighbors(b, x, y) {
		let neighbors = 0;
		const dirs = [
			[-1, -1],
			[-1, 0],
			[-1, 1],
			[0, -1],
			[0, 1],
			[1, -1],
			[1, 0],
			[1, 1],
		];

		for (let [offY, offX] of dirs) {
			let _y = y + offY;
			let _x = x + offX;

			if (_x >= 0 && _x < props.cols && _y >= 0 && _y < props.rows && b[_y][_x])
				neighbors++;
		}
		return neighbors;
	}
}

// utilities
function randomColor() {
	const rc = () => 30 + Math.floor(Math.random() * 200);
	return {
		r: rc(),
		g: rc(),
		b: rc(),
	};
}

function makeEmptyBoard(rows, cols) {
	let results = [];
	for (let y = 0; y < rows; y++) {
		results.push([]);
		for (let x = 0; x < cols; x++) {
			results[y].push(false);
		}
	}
	return results;
}

function useInterval(callback, delay) {
	const savedCallback = useRef();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}
