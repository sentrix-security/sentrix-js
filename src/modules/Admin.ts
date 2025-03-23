import sentrixApiClient, {SentrixApiClient} from "../client";


export class AdminModule {
    private static instance: AdminModule;
    private apiClient : SentrixApiClient;

    constructor(client? : SentrixApiClient) {
        this.apiClient = client ?? sentrixApiClient;
    }

}