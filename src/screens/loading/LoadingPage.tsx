import React from 'react'
import './style.css'

export const LoadingPage = () => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			minHeight: '100%',
		}}
	>
		<div className="container">
			<div className="car-wrapper">
				<div className="car-wrapper_inner">
					<div className="car_outter">
						<div className="car">
							<div className="body">
								<div />
							</div>
							<div className="decos">
								<div className="line-bot" />
								<div className="door">
									<div className="handle" />
									<div className="bottom" />
								</div>
								<div className="window" />
								<div className="light" />
								<div className="light-front" />
								<div className="antenna" />
								<div className="ice-cream">
									<div className="cone" />
								</div>
							</div>
							<div>
								<div className="wheel" />
								<div className="wheel" />
							</div>
							<div className="wind">
								<div className="p p1" />
								<div className="p p2" />
								<div className="p p3" />
								<div className="p p4" />
								<div className="p p5" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="background-stuff">
				<div className="bg" />
				<div className="bg bg-2" />
				<div className="bg bg-3" />
				<div className="ground" />
			</div>
		</div>
	</div>
)
