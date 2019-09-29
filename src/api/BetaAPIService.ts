import axios, { AxiosResponse } from 'axios'
import { API_ENDPOINT } from '../configs/api';


export class BetaAPIService {
    static async get<T>(uri: string, query: any = {}): Promise<T> {
        const rs = await axios.get<any, AxiosResponse<{ data: T, message: string, error: boolean }>>(
            API_ENDPOINT + uri, { params: query }
        )
        if (rs.data.error) throw rs.data.message
        return rs.data.data
    }

    static async post<T>(uri: string, body: any = {}, query: any = null) {
        const rs = await axios.post<any, AxiosResponse<{ data: T, message: string, error: boolean }>>(
            API_ENDPOINT + uri,
            body,
            { params: query }
        )
        if (rs.data.error) throw rs.data.message
        return rs.data.data
    }
}