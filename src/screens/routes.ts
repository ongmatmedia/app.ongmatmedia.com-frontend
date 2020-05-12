import { MainLayout } from '../layouts/main'
import HomePage from './HomePage'

export interface RouteRenderData {
	path: string
	guard: boolean
	component: any
	namespace: string
	layout: any
}

export interface RouteData extends RouteRenderData {
	children?: RouteData[]
}

export const NestedRoutes: RouteData[] = [
	{
		path: '',
		component: HomePage,
		namespace: 'Home',
		layout: MainLayout,
		guard: false,
		children: [],
	},
]

export function exportRouteRenderData(
	routeData: RouteData[],
): RouteRenderData[] {
	const flatMapRenderData: RouteRenderData[] = []
	let queueChildren: RouteData[] = [...routeData]
	let tmp: RouteData[] = []
	do {
		for (const route of queueChildren) {
			if (!route.children) flatMapRenderData.push(route)
			else {
				route.children.map(child => tmp.push(child))
			}
		}
		queueChildren = tmp
		tmp = []
	} while (queueChildren.length > 0)
	return flatMapRenderData
}
