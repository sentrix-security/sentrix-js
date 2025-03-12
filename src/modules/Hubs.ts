import sentrixApiClient, {SentrixApiClient} from "../client";

export class HubsModule {
    private static instance: HubsModule;
    private apiClient : SentrixApiClient;

    constructor(client? : SentrixApiClient) {
        this.apiClient = client ?? sentrixApiClient;
    }

    // TODO add endpoints
}