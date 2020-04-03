import React from 'react'

export const sleep = async (sec: number) => {
	return new Promise(s => {
		setTimeout(s, sec * 1000)
	})
}

export const groupTimeIntoDayMap = <T extends { time: number }>(
	timeDataList: T[],
): Array<{
	time: string
	data: T[]
}> => {
	const dayMap = new Map<string, T[]>()
	for (const data of timeDataList) {
		const day = new Date(data.time).toLocaleDateString()
		if (dayMap.has(day)) dayMap.set(day, [...dayMap.get(day), data])
		else {
			dayMap.set(day, [data])
		}
	}
	const keysDay = [...dayMap.keys()].sort(function (a, b) {
		return new Date(b).getTime() - new Date(a).getTime()
	})
	return keysDay.map(day => ({
		time: day,
		data: dayMap.get(day),
	}))
}

export const isMobileDevice = () => {
	return navigator.userAgent.indexOf('IEMobile') !== -1
}

export function* range(start: number, end: number) {
	yield start
	if (start === end) return
	yield* range(start + 1, end)
}

export const toggleFullScreen = () => {
	const doc = window.document
	const docEl = doc.documentElement

	const requestFullScreen =
		docEl.requestFullscreen ||
		docEl.mozRequestFullScreen ||
		docEl.webkitRequestFullScreen ||
		docEl.msRequestFullscreen
	const cancelFullScreen =
		doc.exitFullscreen ||
		doc.mozCancelFullScreen ||
		doc.webkitExitFullscreen ||
		doc.msExitFullscreen

	if (
		!doc.fullscreenElement &&
		!doc.mozFullScreenElement &&
		!doc.webkitFullscreenElement &&
		!doc.msFullscreenElement
	) {
		requestFullScreen.call(docEl)
	} else {
		cancelFullScreen.call(doc)
	}
}

export function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomDate(start: Date, end: Date) {
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime()),
	)
}

export const bankIcons = {
	vietcombank:
		'https://seeklogo.net/wp-content/uploads/2016/07/vietcombank-vector-logo.png',
	vietinbank:
		'https://seeklogo.net/wp-content/uploads/2016/01/vietinbank-logo-vector-download.jpg',
	techcombank:
		'https://seeklogo.net/wp-content/uploads/2016/11/techcombank-logo-preview.png',
	agribank: 'https://seeklogo.net/wp-content/uploads/2016/07/Agribank-logo.png',
	bidv: 'https://seeklogo.net/wp-content/uploads/2016/07/BIDV-logo.png',
	tpbank: 'https://tienaoplus.com/wp-content/uploads/2020/02/logo-tpbank.jpg',
	mbbank: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Logo_MB_new.png',
	default:
		'https://img.favpng.com/16/23/14/logo-money-png-favpng-WpK8j8ryKb8greFrrbueFqnV4.jpg',
}

export const exportBankIcon = (name: string) => {
	const bankName = name.trim().split(' ')[0].toLocaleLowerCase()
	return bankIcons[bankName] || bankIcons['default']
}

export function nFormatter(num: number, digits: number) {
	const prefix = num < 0 ? '-' : ''
	const si = [
		{ value: 1, symbol: '' },
		{ value: 1e3, symbol: 'K' },
		{ value: 1e6, symbol: 'M' },
		{ value: 1e9, symbol: 'G' },
		{ value: 1e12, symbol: 'T' },
		{ value: 1e15, symbol: 'P' },
		{ value: 1e18, symbol: 'E' },
	]
	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
	let i
	for (i = si.length - 1; i > 0; i--) {
		if (Math.abs(num) >= si[i].value) {
			break
		}
	}
	return (
		prefix +
		(Math.abs(num) / si[i].value).toFixed(digits).replace(rx, '$1') +
		si[i].symbol
	)
}

export const useSortableData = <T extends {}>(
	items: Array<T>,
	config: { key: string; direction: 'ascending' | 'descending' | null },
) => {
	const [sortConfig, setSortConfig] = React.useState<{
		key: string
		direction: 'ascending' | 'descending' | null
	}>(config)

	const sortedItems = React.useMemo(() => {
		const sortableItems = [...items]
		if (sortConfig !== null) {
			sortableItems.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === 'ascending' ? -1 : 1
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === 'ascending' ? 1 : -1
				}
				return 0
			})
		}
		return sortableItems
	}, [items, sortConfig])

	const requestSort = (key: string) => {
		let direction = 'ascending'
		if (
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === 'ascending'
		) {
			direction = 'descending'
		}
		setSortConfig({ key, direction })
	}

	return { items: sortedItems, requestSort, sortConfig }
}

export const randomString = () =>
	Math.random().toString(36).substring(2, 15) +
	Math.random().toString(36).substring(2, 15)

export function clearStorageWithRegex(regex: string): void {
	for (const i in localStorage) {
		if (localStorage.hasOwnProperty(i)) {
			if (i.match(regex) || (!regex && typeof i === 'string')) {
				localStorage.removeItem(i)
				sessionStorage.clear()
				document.cookie.split(';').forEach(function (c) {
					document.cookie = c
						.replace(/^ +/, '')
						.replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
				})
			}
		}
	}
}
