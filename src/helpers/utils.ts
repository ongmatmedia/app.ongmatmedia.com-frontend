export const sleep = async (sec: number) => {
	return new Promise(s => {
		setTimeout(() => {
			window.location.reload()
		}, sec * 1000)
	})
}

export const groupTimeIntoDayMap = <T extends { time: number }>(
	timeDataList: T[],
): Array<{
	time: string
	data: T[]
}> => {
	let dayMap = new Map<string, T[]>()
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
	yield start;
	if (start === end) return;
	yield* range(start + 1, end);
}

export const toggleFullScreen = () => {
	var doc = window.document;
	var docEl = doc.documentElement;

	var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
	var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

	if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
		requestFullScreen.call(docEl);
	}
	else {
		cancelFullScreen.call(doc);
	}
}

export function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomDate(start: Date, end: Date) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}