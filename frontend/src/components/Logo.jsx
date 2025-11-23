import React from 'react';

function Logo({ size = 180, width, className = '', textColor = '#0E1A30' }) {
	let logoWidth = size;
	let logoHeight = (logoWidth / 3.5) * 1;
	
	if (width) {
		if (typeof width === 'number') {
			logoWidth = width;
			logoHeight = (logoWidth / 3.5) * 1;
		} else if (typeof width === 'string') {
			if (width.includes('%') || width.includes('px')) {
				return (
					<svg
						width={width}
						height='auto'
						className={className}
						viewBox='0 0 560 160'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						preserveAspectRatio='xMidYMid meet'>
						<defs>
							<linearGradient id='grad' x1='0' y1='0' x2='1' y2='1'>
								<stop offset='0%' stopColor='#2EE7D2' />
								<stop offset='100%' stopColor='#1E64F0' />
							</linearGradient>
						</defs>

						<rect x='0' y='0' width='140' height='140' rx='28' fill='url(#grad)' />

						<path
							d='M40 38h48l12 12v52a6 6 0 0 1-6 6H40a6 6 0 0 1-6-6V44a6 6 0 0 1 6-6z'
							fill='white'
						/>
						<rect
							x='50'
							y='60'
							width='40'
							height='6'
							rx='3'
							fill='#1E64F0'
							opacity='0.25'
						/>
						<rect
							x='50'
							y='76'
							width='40'
							height='6'
							rx='3'
							fill='#1E64F0'
							opacity='0.25'
						/>
						<rect
							x='50'
							y='92'
							width='26'
							height='6'
							rx='3'
							fill='#1E64F0'
							opacity='0.25'
						/>

						<path d='M88 38v12h12L88 38z' fill='#C7E3FF' opacity='0.9' />

						<text
							x='160'
							y='93'
							fontFamily='Arial, Helvetica, sans-serif'
							fontSize='64'
							fontWeight='600'
							fill={textColor}>
							Postify
						</text>
					</svg>
				);
			} else {
				logoWidth = parseInt(width);
				logoHeight = (logoWidth / 3.5) * 1;
			}
		}
	}
	
	return (
		<svg
			width={logoWidth}
			height={logoHeight}
			className={className}
			viewBox='0 0 560 160'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<defs>
				<linearGradient id='grad' x1='0' y1='0' x2='1' y2='1'>
					<stop offset='0%' stopColor='#2EE7D2' />
					<stop offset='100%' stopColor='#1E64F0' />
				</linearGradient>
			</defs>

			<rect x='0' y='0' width='140' height='140' rx='28' fill='url(#grad)' />

			<path
				d='M40 38h48l12 12v52a6 6 0 0 1-6 6H40a6 6 0 0 1-6-6V44a6 6 0 0 1 6-6z'
				fill='white'
			/>
			<rect
				x='50'
				y='60'
				width='40'
				height='6'
				rx='3'
				fill='#1E64F0'
				opacity='0.25'
			/>
			<rect
				x='50'
				y='76'
				width='40'
				height='6'
				rx='3'
				fill='#1E64F0'
				opacity='0.25'
			/>
			<rect
				x='50'
				y='92'
				width='26'
				height='6'
				rx='3'
				fill='#1E64F0'
				opacity='0.25'
			/>

			<path d='M88 38v12h12L88 38z' fill='#C7E3FF' opacity='0.9' />

			<text
				x='160'
				y='93'
				fontFamily='Arial, Helvetica, sans-serif'
				fontSize='64'
				fontWeight='600'
				fill={textColor}>
				Postify
			</text>
		</svg>
	);
}

export default Logo;
