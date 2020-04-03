export async function BatchAsync<ResultType>(
	n: number,
	f: (index?: number) => Promise<ResultType | void>,
	err: (index: number) => Promise<ResultType | void> = async () => {},
): Promise<ResultType[]> {
	const queue: Array<Promise<ResultType | void>> = []
	for (let i = 1; i <= n; i++) queue.push(f(i).catch(e => err(i)))
	return (await Promise.all(queue)).filter(f => f != undefined) as ResultType[]
}

export async function BatchSync<ResultType>(
	n: number,
	f: (index?: number) => Promise<ResultType | void>,
	err: (index: number) => Promise<ResultType | void> = async () => {},
): Promise<ResultType[]> {
	const queue: Array<ResultType | void> = []
	for (let i = 1; i <= n; i++) queue.push(await f(i).catch(e => err(i)))
	return (await Promise.all(queue)).filter(f => f != undefined) as ResultType[]
}

export async function AsyncForEach<ItemType, ResultType>(
	items: ItemType[],
	f: (item: ItemType, index: number) => Promise<ResultType | void>,
	err: (
		item: ItemType,
		index: number,
		e: Error,
	) => Promise<ResultType | void> = async () => {},
): Promise<ResultType[]> {
	const queue: Array<Promise<ResultType | void>> = []
	items.map((item, index) =>
		queue.push(f(item, index).catch(e => err(item, index, e))),
	)
	return (await Promise.all(queue)).filter(f => f != undefined) as ResultType[]
}

export async function SyncForEach<ItemType, ResultType>(
	items: ItemType[],
	f: (item: ItemType, index?: number) => Promise<ResultType | void>,
	err: (
		item: ItemType,
		index: number,
	) => Promise<ResultType | void> = async () => {},
): Promise<ResultType[]> {
	const queue: Array<ResultType | void> = []
	for (const [index, item] of Object.entries<ItemType>(items)) {
		queue.push(
			await f(item, Number(index)).catch(e => err(item, Number(index))),
		)
	}
	return (await Promise.all(queue)).filter(f => f != undefined) as ResultType[]
}

export async function AsyncEachBlock<ItemType, ResultType>(
	items: ItemType[],
	block: number,
	f: (item: ItemType, index?: number) => Promise<ResultType | void>,
	err: (
		item: ItemType,
		index: number,
		err: any,
	) => Promise<ResultType | void> = async () => {},
): Promise<ResultType[]> {
	const size = Math.ceil(items.length / block)
	let rs: Array<ResultType> = []
	for (let i = 1; i <= size; i++) {
		const list = items.slice((i - 1) * block, i * block)
		rs = rs.concat(
			await AsyncForEach(list, (item, j) => f(item, j + (i - 1) * block), err),
		)
	}
	return rs
}

export async function InfinitiLoop(
	f: () => Promise<any>,
	err: (e: Error) => Promise<any> = async () => {},
) {
	while (true) {
		try {
			if ((await f()) == true) break
		} catch (e) {
			await err(e)
		}
	}
}

export async function PingInfinity(
	delay: number,
	f: () => Promise<any>,
	err: (e: Error) => Promise<any> = async () => {},
) {
	try {
		await f()
	} catch (e) {
		err(e)
	}

	const task = setInterval(async () => {
		try {
			if ((await f()) == true) clearInterval(task)
		} catch (e) {
			err(e)
		}
	}, delay)
}

export function GetUniquee<T, K extends keyof T>(items: T[], key: K): T[] {
	const list = new Set()
	return items.filter(item => {
		if (list.has(item[key])) return false
		list.add(item[key])
		return true
	})
}
