import sentrixApiClient, {SentrixApiClient} from "../client";

export class ProductsModule {
    private static instance: ProductsModule;
    private apiClient : SentrixApiClient;

    constructor(client? : SentrixApiClient) {
        this.apiClient = client ?? sentrixApiClient;
    }

    // TODO add endpoints
}