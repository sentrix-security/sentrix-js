import sentrixApiClient, {SentrixApiClient} from "../client";
import {PaginatedRequestParams, PaginatedResult} from "../common/commonTypes";
import {ListProductsRecord} from "./Products";

export type HubRecord = {
    id: number;
    name: string;
    description: string;
    owned_by: {
        id: number;
        username: string;
    };
    created_at: string;
    updated_at: string;
    created_by: {
        id: number;
        username: string;
    };
    updated_by: {
        id: number;
        username: string;
    };
}

export type ListHubsRecord = Omit<HubRecord, "created_by" | "updated_by">
export type ListHubProductsRecord = Omit<ListProductsRecord, "hub">
export type ListHubPurchasesRecord = Omit<ListProductsRecord, "hub">

export type CreateHubResponse = Omit<HubRecord, "updated_at" | "updated_by">
export type UpdateHubResponse = HubRecord
export type DeleteHubResponse = {
    success: boolean;
}

export type CreateHubData = {
    name: string;
    description: string;
}
export type UpdateHubData = Partial<CreateHubData>

export class HubsModule {
    private static instance: HubsModule;
    private apiClient : SentrixApiClient;

    constructor(client? : SentrixApiClient) {
        this.apiClient = client ?? sentrixApiClient;
    }

    public async listHubs(params : PaginatedRequestParams) : Promise<PaginatedResult<ListHubsRecord>> {
        const response = await this.apiClient.get<PaginatedResult<ListHubsRecord>>("/v1/hubs", {
            params: params,
        })
        return response.data;
    }

    public async listProducts(hubId: number, params : PaginatedRequestParams) : Promise<PaginatedResult<ListHubProductsRecord>> {
        const response = await this.apiClient.get<PaginatedResult<ListHubProductsRecord>>(`/v1/hubs/${hubId}/products`, {
            params: params,
        })
        return response.data
    }

    public async listPurchases(hubId: number, params : PaginatedRequestParams) : Promise<PaginatedResult<ListHubPurchasesRecord>> {
        const response = await this.apiClient.get<PaginatedResult<ListHubPurchasesRecord>>(`/v1/hubs/${hubId}/purchases`, {
            params: params,
        })
        return response.data;
    }

    public async getHubById(id: number) : Promise<HubRecord> {
        const response = await this.apiClient.get<HubRecord>(`/v1/hubs/${id}`)
        return response.data;
    }

    public async updateHubById(id: number, data: UpdateHubData) : Promise<UpdateHubResponse> {
        const response = await this.apiClient.put<UpdateHubResponse>(`/v1/hubs/${id}`, {
            data: data
        })
        return response.data;
    }

    public async deleteHubById(id: number) : Promise<DeleteHubResponse> {
        const response = await this.apiClient.delete<DeleteHubResponse>(`/v1/hubs/${id}`)
        return response.data;
    }
}