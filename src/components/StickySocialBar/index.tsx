import React from 'react'
import './style.css'
import { Icon } from 'antd'

export const StickySocialBar = () => (
	<div className="icon-bar">
		<a href="#" className="facebook">
			<Icon type="facebook" />
		</a>
		<a href="#" className="twitter">
			<Icon type="twitter" />
		</a>
		<a href="#" className="google">
			<i className="fa fa-google"></i>
		</a>
		<a href="#" className="linkedin">
			<i className="fa fa-linkedin"></i>
		</a>
		<a href="#" className="youtube">
			<i className="fa fa-youtube"></i>
		</a>
	</div>
)
