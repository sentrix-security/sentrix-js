import axios, { AxiosInstance } from "axios";

class Api {
  private static instance: Api;
  private axiosInstance: AxiosInstance;
  private hubToken: string | null = null;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: "https://api.sentrix.cc",
    });
  }

  public static getInstance(): Api {
    if (!Api.instance) {
      Api.instance = new Api();
    }
    return Api.instance;
  }

  public setHubToken(token: string) {
    this.hubToken = token;
    this.axiosInstance.defaults.headers.common["apiKey"] = token;
  }

  public async get(endpoint: string) {
    return this.axiosInstance.get(endpoint);
  }

  public async post(endpoint: string, data: any) {
    return this.axiosInstance.post(endpoint, data);
  }
}

export default Api.getInstance();
