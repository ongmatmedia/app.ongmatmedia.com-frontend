import axios, { AxiosResponse } from 'axios';
import { API_ENDPOINT } from '../configs/api';
import { Auth } from 'aws-amplify';

const rq = axios.create({
  baseURL: API_ENDPOINT,
});

export class API {
  private static async getAccessToken(): Promise<string> {
    const user = await Auth.currentSession();
    return user.getAccessToken().getJwtToken();
  }
  static async get<T>(uri: string, query: any = {}): Promise<T> {
    const headers = {
      Authorization: await this.getAccessToken(),
    };
    const rs = await rq.get<any, AxiosResponse<{ data: T; message: string; error: boolean }>>(uri, {
      params: query,
      headers,
    });
    if (rs.data.error) throw rs.data.message;
    return rs.data.data;
  }

  static async post<T>(uri: string, body: any = {}, query: any = null) {
    const headers = {
      Authorization: await this.getAccessToken(),
    };
    const rs = await rq.post<any, AxiosResponse<{ data: T; message: string; error: boolean }>>(
      uri,
      body,
      { params: query, headers },
    );
    if (rs.data.error) throw rs.data.message;
    return rs.data.data;
  }
}
