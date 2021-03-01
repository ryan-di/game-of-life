import '../styles/Tips.css';

export default function Tips(props) {
	return (
		<div
			className="tip-container"
			style={{
				width: props.width ? props.width : '100%',
				textAlign: props.textAlign ? props.textAlign : 'left',
				margin: props.margin ? props.margin : '20px auto',
			}}
		>
			<div>
				<div className="btn-container">
					<button
						className="btn-close"
						onClick={() => {
							document.querySelector('.tip-container').remove();
						}}
					>
						X
					</button>
				</div>
				<p className="tip-content">
					Click on the board to add or remove a cell. Click{' '}
					<strong>"Next"</strong> to get the next iteration and click{' '}
					<strong>"Prev"</strong> to go back. You can go back up to{' '}
					{props.steps} steps. You can also simply click <strong>"Run"</strong>{' '}
					to watch it unflod automatically. Finally, click{' '}
					<strong>"Reset"</strong> to simply clear the board and start over.
					<br />
					<br />
					You can find out more about Conway's Game of Life{' '}
					<a
						target="_blank"
						href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
					>
						here
					</a>
					.
				</p>
			</div>
		</div>
	);
}
