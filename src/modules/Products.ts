import sentrixApiClient, {SentrixApiClient} from "../client";
import {PaginatedRequestParams, PaginatedResult} from "../common/commonTypes";
import {ListHubProductsRecord} from "./Hubs";

export type ProductRecord = {
    id: number;
    name: string;
    description: string;
    priceRobux: number;
    is_on_sale: boolean;
    hub: {
        id: number;
        name: string;
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

export type ListProductsRecord = Omit<ProductRecord, "updated_by" | "created_by">
export type CreateProductResponse = Omit<ProductRecord, "updated_at" | "updated_by">
export type UpdateProductResponse = ProductRecord
export type DeleteProductResponse = {
    success: boolean
}

export type CreateProductData = {
    name: string;
    description: string;
    priceRobux: number;
    is_on_sale: boolean;
    hub_id: number;
}
export type UpdateProductData = Partial<Omit<CreateProductData, "hub_id">>

export class ProductsModule {
    private static instance: ProductsModule;
    private apiClient : SentrixApiClient;

    constructor(client? : SentrixApiClient) {
        this.apiClient = client ?? sentrixApiClient;
    }

    public async listProducts(params : PaginatedRequestParams) : Promise<PaginatedResult<ListProductsRecord>> {
        const response = await this.apiClient.get<PaginatedResult<ListProductsRecord>>("/v1/products", {
            params: params,
        })
        return response.data
    }

    public async listProductsForHub(hubId: number, params : PaginatedRequestParams) : Promise<PaginatedResult<ListHubProductsRecord>> {
        return this.apiClient.hubs.listProducts(hubId, params)
    }

    public async getProductById(id: number) : Promise<ProductRecord> {
        const response = await this.apiClient.get<ProductRecord>(`/v1/products/${id}`)
        return response.data;
    }

    public async createProduct(data: CreateProductData) : Promise<CreateProductResponse> {
        const response = await this.apiClient.post<CreateProductResponse>("/v1/products", {
            data: data
        })
        return response.data;
    }

    public async updateProductById(id: number, data: UpdateProductData) : Promise<UpdateProductResponse> {
        const response = await this.apiClient.put<UpdateProductResponse>(`/v1/products/${id}`, {
            data: data
        })
        return response.data;
    }

    public async deleteProductById(id: number) : Promise<DeleteProductResponse> {
        const response = await this.apiClient.delete<DeleteProductResponse>(`/v1/products/${id}`)
        return response.data;
    }
}