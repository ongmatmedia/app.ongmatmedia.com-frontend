declare let registration: ServiceWorkerRegistration

addEventListener('install', () => {
	console.log('Service worker installed')
})

addEventListener('push', async event => {
	const data = (event as any).data.json()
})
