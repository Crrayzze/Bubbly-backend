/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";

export class HttpAuth {
	public get(url: string): Promise<AxiosResponse<any>> {
		return axios.get(url);
	}

	public post(url: string, body: any): Promise<AxiosResponse<any>> {
		return axios.post(url, body);
	}

	public put(url: string, body: any): Promise<AxiosResponse<any>> {
		return axios.put(url, body);
	}

	public delete(url: string): Promise<AxiosResponse<any>> {
		return axios.delete(url);
	}
}
