import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {SentrixApiError} from "./common/SentrixApiError";
import {AuthenticationModule} from "./modules/Authentication";
import {HubsModule} from "./modules/Hubs";
import {ProductsModule} from "./modules/Products";
import {PurchasesModule} from "./modules/Purchases";
import {AdminModule} from "./modules/Admin";

export class SentrixApiClient {
  private static instance: SentrixApiClient;
  private axiosInstance: AxiosInstance;

  private userAccessToken?: string;
  private botAccessToken?: string;
  private hubAccessToken?: string;

  public authentication : AuthenticationModule = new AuthenticationModule(this);
  public hubs : HubsModule = new HubsModule(this);
  public products : ProductsModule = new ProductsModule(this);
  public purchases : PurchasesModule = new PurchasesModule(this);
  public admin : AdminModule = new AdminModule(this);

  private constructor(baseUrl? : string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl ?? process.env.SENTRIX_CLIENT_BASE_URL ?? "https://api.sentrix.cc",
    });
  }

  public static getInstance() {
    if (!SentrixApiClient.instance) {
      SentrixApiClient.instance = new SentrixApiClient();
    }
    return SentrixApiClient.instance;
  }

  public authenticateUser(accessToken: string) : SentrixApiClient {
    this.userAccessToken = accessToken;
    this.botAccessToken = undefined;
    this.hubAccessToken = undefined;
    return this;
  }
  public authenticateBot(accessToken: string) : SentrixApiClient {
    this.userAccessToken = undefined;
    this.botAccessToken = accessToken;
    this.hubAccessToken = undefined;
    return this;
  }
  public authenticateHub(accessToken: string) : SentrixApiClient {
    this.userAccessToken = undefined;
    this.botAccessToken = undefined;
    this.hubAccessToken = accessToken;
    return this;
  }

  private getAuthHeader() {
    if (this.userAccessToken) {
      return `Bearer ${this.userAccessToken}`
    } else if (this.botAccessToken) {
      return `Bot ${this.botAccessToken}`
    } else if (this.hubAccessToken) {
      return `Hub ${this.hubAccessToken}`
    }
  }

  public async get<TResponse = any>(endpoint: string, additionalConfig? : AxiosRequestConfig | undefined) : Promise<AxiosResponse<TResponse>> {
    return this.wrapRequest({
      ...additionalConfig,
      method: "GET",
      url: endpoint,
    })
  }

  public async post<TResponse = any>(endpoint: string, additionalConfig? : AxiosRequestConfig | undefined) : Promise<AxiosResponse<TResponse>> {
    return this.wrapRequest({
      ...additionalConfig,
      method: "POST",
      url: endpoint,
    })
  }

  public async put<TResponse = any>(endpoint: string, additionalConfig? : AxiosRequestConfig | undefined) : Promise<AxiosResponse<TResponse>> {
    return this.wrapRequest({
      ...additionalConfig,
      method: "PUT",
      url: endpoint,
    })
  }

  public async delete<TResponse = any>(endpoint: string, additionalConfig? : AxiosRequestConfig | undefined) : Promise<AxiosResponse<TResponse>> {
    return this.wrapRequest({
      ...additionalConfig,
      method: "DELETE",
      url: endpoint,
    })
  }

  private async wrapRequest(request : AxiosRequestConfig) {
    const {headers, ...requestInit} = request;
    const defaultedHeaders = request.headers ?? {};

    const response = await this.axiosInstance.request({
      ...requestInit,
      headers: {
        ...defaultedHeaders,
        'Authorization': this.getAuthHeader()
      },
      validateStatus: () => true,
    });

    if (response.status != 200) {
      throw new SentrixApiError(response)
    }

    return response;
  }

}
export default SentrixApiClient.getInstance();