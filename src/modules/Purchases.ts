import sentrixApiClient, {SentrixApiClient} from "../client";
import {EnumWhitelistType, PaginatedRequestParams, PaginatedResult} from "../common/commonTypes";

export type PurchaseRecord = {
    id: number,
    whitelisted_id: string,
    whitelisted_type: EnumWhitelistType,
    product: {
        id: number,
        username: string
    },
    purchased_by: {
        id: number,
        username: string
    },
    created_manually: boolean,
    active: boolean,
    created_at: string,
    created_by: {
        id: number,
        username: string
    }
    updated_at: string
    updated_by: {
        id: number,
        username: string
    }
}
export type ListPurchaseRecord = Omit<PurchaseRecord, "updated_by" | "created_by">
export type ListMyPurchaseRecord = Omit<PurchaseRecord, "updated_by" | "created_by" | "created_manually" | "purchased_by">
export type CreatePurchaseResponse = Omit<PurchaseRecord, "updated_at" | "updated_by">
export type UpdatePurchaseResponse = PurchaseRecord
export type DeletePurchaseResponse = {
    success: boolean
}

export type CreatePurchaseData = {
    whitelisted_id: string,
    whitelisted_type: EnumWhitelistType,
    product_id: number,
    purchased_by_id: number
    active: boolean,
}
export type UpdatePurchaseData = Partial<Omit<CreatePurchaseData, "product_id">>

export class PurchasesModule {
    private static instance: PurchasesModule;
    private apiClient : SentrixApiClient;

    constructor(client? : SentrixApiClient) {
        this.apiClient = client ?? sentrixApiClient;
    }

    public async listPurchases(paginationParams : PaginatedRequestParams) : Promise<PaginatedResult<ListPurchaseRecord>> {
        const response = await this.apiClient.get<PaginatedResult<ListPurchaseRecord>>("/v1/purchases", {
            params: {
                page: paginationParams.page,
                pageSize: paginationParams.pageSize,
                filterField: paginationParams.filterField,
                filterMode: paginationParams.filterMode,
                filter: paginationParams.filterMode,
            }
        })
        return response.data;
    }

    public async listMyPurchases(paginationParams : PaginatedRequestParams) : Promise<PaginatedResult<ListMyPurchaseRecord>> {
        const response = await this.apiClient.get<PaginatedResult<ListMyPurchaseRecord>>("/v1/purchases/my", {
            params: {
                page: paginationParams.page,
                pageSize: paginationParams.pageSize,
                filterField: paginationParams.filterField,
                filterMode: paginationParams.filterMode,
                filter: paginationParams.filterMode,
            }
        })
        return response.data;
    }

    public async getPurchaseById(id: number) : Promise<PurchaseRecord> {
        const response = await this.apiClient.get<PurchaseRecord>(`/v1/purchases/${id}`)
        return response.data;
    }

    public async createPurchase(data: CreatePurchaseData) : Promise<CreatePurchaseResponse> {
        const response = await this.apiClient.post<CreatePurchaseResponse>("/v1/purchases", {
            data: data
        })
        return response.data;
    }

    public async updatePurchaseById(id: number, data: UpdatePurchaseData) : Promise<UpdatePurchaseResponse> {
        const response = await this.apiClient.put<UpdatePurchaseResponse>(`/v1/purchases/${id}`, {
            data: data
        })
        return response.data;
    }

    public async deletePurchaseById(id: number) : Promise<DeletePurchaseResponse> {
        const response = await this.apiClient.delete<DeletePurchaseResponse>(`/v1/purchases/${id}`)
        return response.data;
    }
}