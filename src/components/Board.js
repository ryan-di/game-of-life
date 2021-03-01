import React, { useState } from 'react';
import '../styles/Board.css';

function Cell(props) {
	let left = props.size * props.x + 1;
	let top = props.size * props.y + 1;
	let size = props.size - 1;
	const [color] = useState(props.color);
	return (
		<div
			className="Cell"
			style={{
				left,
				top,
				width: size,
				height: size,
				backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
			}}
		/>
	);
}

export default function Board(props) {
	let boardRef = React.createRef();

	return (
		<div
			className="Board"
			style={{
				width: props.size * props.cols,
				height: props.size * props.rows,
				backgroundSize: `${props.size}px ${props.size}px`,
			}}
			ref={boardRef}
			onClick={(event) => {
				const pos = getClickPosition(event);
				props.onClick(pos.x, pos.y);
			}}
		>
			{props.cells.map((cell) => (
				<Cell
					x={cell.x}
					y={cell.y}
					color={cell.color}
					size={props.size}
					key={`${cell.y}, ${cell.x}`}
				/>
			))}
		</div>
	);

	function getClickPosition(event) {
		const rect = boardRef.current.getBoundingClientRect();
		const offX = event.clientX - rect.left;
		const offY = event.clientY - rect.top;
		const x = Math.floor(offX / props.size);
		const y = Math.floor(offY / props.size);
		return {
			x,
			y,
		};
	}
}
