import Card from 'antd/lib/card'
import React from 'react'
import { BreadCrumb } from '../../../components/common/BreadCrumb'
import './style.css'

export const PricingPage = () => {
	return (
		<Card title={<BreadCrumb />}>
			<h2 style={{ textAlign: 'center' }}>Responsive Pricing Tables</h2>
			<p style={{ textAlign: 'center' }}>
				Resize the browser window to see the effect.
			</p>
			<div className="columns disabled">
				<ul className="price">
					<li className="header">Basic</li>
					<li className="grey">$ 9.99 / year</li>
					<li>10GB Storage</li>
					<li>10 Emails</li>
					<li>10 Domains</li>
					<li>1GB Bandwidth</li>
					<li className="grey">
						<a href="#" className="button">
							Sign Up
						</a>
					</li>
				</ul>
			</div>
			<div className="columns">
				<ul className="price">
					<li className="header" style={{ backgroundColor: '#4CAF50' }}>
						Pro
					</li>
					<li className="grey">$ 24.99 / year</li>
					<li>25GB Storage</li>
					<li>25 Emails</li>
					<li>25 Domains</li>
					<li>2GB Bandwidth</li>
					<li className="grey">
						<a href="#" className="button">
							Sign Up
						</a>
					</li>
				</ul>
			</div>
			<div className="columns disabled">
				<ul className="price">
					<li className="header">Premium</li>
					<li className="grey">$ 49.99 / year</li>
					<li>50GB Storage</li>
					<li>50 Emails</li>
					<li>50 Domains</li>
					<li>5GB Bandwidth</li>
					<li className="grey">
						<a href="#" className="button">
							Sign Up
						</a>
					</li>
				</ul>
			</div>
		</Card>
	)
}
