import axios, {AxiosResponse} from 'axios'
import {API_GATEWAY} from '../config'

const rq = axios.create({
	baseURL: API_GATEWAY,
})

export class API
{
	static async get<T> (uri: string, query: any = {}): Promise<T>
	{
		const rs = await rq.get(uri, {
			params: query,
		})
		return rs.data
	}

	static async post<T> (uri: string, body: any = {}, query: any = null): Promise<T>
	{
		const rs = await rq.post(uri, body, {params: query})
		return rs.data	
	}
}
