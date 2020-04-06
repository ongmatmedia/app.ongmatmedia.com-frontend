import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import React from 'react'
import { Breadcrumb } from 'antd'

export const BreadCrumb = (withRouter as any)((props: RouteComponentProps) => {
	const routesTree = props.location.pathname
		.split('/')
		.slice(1)
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
					<span onClick={() => props.history.push(`${route.path}`)}>
						{route.breadcrumbName}
					</span>
				)
			}}
			routes={routesTree}
			separator=">"
		/>
	)
})
