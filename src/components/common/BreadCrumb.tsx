import Breadcrumb from 'antd/lib/breadcrumb'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

export const BreadCrumb = (withRouter as any)((props: RouteComponentProps) => {
	const routesTree = props.location.pathname
		.split('/')
		.slice(1)
		.filter(el => el !== '')
		.map(el => ({
			path: `/${el}`,
			breadcrumbName:
				el.charAt(0).toUpperCase() + el.substring(1).replace(/-/g, ' '),
		}))
	routesTree.unshift({
		path: '/',
		breadcrumbName: 'Home',
	})

	return (
		<Breadcrumb
			itemRender={(route, params, routes, paths) => {
				const last = routes.indexOf(route) === routes.length - 1
				return last ? (
					<span>{route.breadcrumbName}</span>
				) : (
					<span
						onClick={() => props.history.push(`${route.path}`)}
						style={{ cursor: 'pointer' }}
					>
						{route.breadcrumbName}
					</span>
				)
			}}
			routes={routesTree}
			separator=">"
		/>
	)
})
