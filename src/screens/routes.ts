import { AuthLayout } from '../layouts/auth'
import { MainLayout } from '../layouts/main'
import { AccountScreen } from './account'
import { AgencyPage } from './agency'
import { Login, ResetPassword } from './auth'
import { SetNewPasswordPage } from './auth/set-new-pass'
import { DepositPage } from './deposit'
import { HomePage } from './HomePage'
import { LivestreamTabs } from './livestream'
import { Payments } from './payments'
import { SeedingPage } from './seeding'
import { BuffViewers } from './seeding/buff-viewers'
import { BuffViewersLivestream } from './seeding/buff-viewers-livestream'
import { VipViewersLivestream } from './seeding/vip-viewers-livestream'

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
		children: [
			{
				component: Login,
				layout: AuthLayout,
				namespace: 'Login',
				guard: false,
				path: '/auth/login',
			},
			{
				component: SetNewPasswordPage,
				layout: AuthLayout,
				namespace: 'Set new password',
				guard: false,
				path: '/auth/set-new-password',
			},
			{
				component: ResetPassword,
				layout: AuthLayout,
				namespace: 'Reset password',
				guard: false,
				path: '/auth/reset-password',
			},
			{
				component: AccountScreen,
				layout: MainLayout,
				namespace: 'Accounts',
				guard: true,
				path: '/accounts',
				children: [
					{
						component: Payments,
						layout: MainLayout,
						namespace: 'Payments',
						guard: true,
						path: '/payments',
					},
				],
			},
			{
				path: '/seeding',
				component: SeedingPage,
				namespace: 'Seeding',
				guard: true,
				layout: MainLayout,
				children: [
					{
						component: VipViewersLivestream,
						layout: MainLayout,
						namespace: 'Vip viewers Livestream',
						guard: false,
						path: '/vip-viewers-livestream',
					},
					{
						component: BuffViewersLivestream,
						namespace: 'Buff viewers Livestream',
						layout: MainLayout,
						guard: false,
						path: '/buff-viewers-livestream',
					},
					{
						component: BuffViewers,
						layout: MainLayout,
						namespace: 'Buff viewers',
						guard: false,
						path: '/buff-viewers',
					},
				],
			},
			{
				path: '/agency',
				guard: true,
				layout: MainLayout,
				component: AgencyPage,
				namespace: 'Agency',
			},
			{
				path: '/deposit',
				guard: true,
				component: DepositPage,
				namespace: 'Deposit',
				layout: MainLayout,
			},
			{
				path: '/livestream',
				guard: true,
				component: LivestreamTabs,
				namespace: 'Livestream',
				layout: MainLayout,
			},
		],
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
