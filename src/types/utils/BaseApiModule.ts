import { AxiosInstance, AxiosRequestConfig } from "axios";
import Api from "@/api/api";

export default class BaseApiModule {
  private subPath: string;
  private api: Api;
  constructor(api: Api, subPath: string) {
    this.subPath = subPath;
    this.api = api;
  }

  protected post<T, K>(
    url: string = "",
    data?: T,
    config?: AxiosRequestConfig
  ) {
    return this.api.axios.post<T, AxiosRequestConfig<K>>(
      this.subPath + url,
      data,
      config
    );
  }

  protected get<T>(url: string = "", config?: AxiosRequestConfig) {
    return this.api.axios.get<T>(this.subPath + url, config);
  }

  protected patch<T, K>(
    url: string = "",
    data?: T,
    config?: AxiosRequestConfig
  ) {
    return this.api.axios.patch<T, AxiosRequestConfig<K>>(
      this.subPath + url,
      data,
      config
    );
  }
  protected put<T, K>(url: string = "", data?: T, config?: AxiosRequestConfig) {
    return this.api.axios.put<T, AxiosRequestConfig<K>>(
      this.subPath + url,
      data,
      config
    );
  }

  protected delete<T>(url: string = "", config?: AxiosRequestConfig) {
    return this.api.axios.delete<T>(this.subPath + url, config);
  }
}
