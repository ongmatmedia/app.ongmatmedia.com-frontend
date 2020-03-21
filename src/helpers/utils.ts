export const sleep = async (sec: number) => {
	return new Promise(s => {
		setTimeout(() => {
			window.location.reload()
		}, sec * 1000)
	})
}

export const groupTimeIntoDayMap = <T extends { time: number }>(timeDataList: T[]): Array<{
	time: string,
	data: T[]
}> => {
	let dayMap = new Map<string, T[]>()
	for (const data of timeDataList) {
		const day = new Date(data.time).toLocaleDateString()
		if (dayMap.has(day)) dayMap.set(day, [
			...dayMap.get(day),
			data
		])
		else {
			dayMap.set(day, [data])
		}
	}
	const keysDay = [...dayMap.keys()].sort(function (a, b) {
		return new Date(b).getTime() - new Date(a).getTime()
	});
	return keysDay.map(day => ({
		time: day,
		data: dayMap.get(day)
	}))
}