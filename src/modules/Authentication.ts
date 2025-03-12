import sentrixApiClient, {SentrixApiClient} from "../client";

export type LoginDiscordResponse = {
    success: boolean;
    access_token: string;
}
export type LinkRobloxResponse = {
    success: boolean;
}
export type LogoutResponse = {
    success: boolean;
}


export class AuthenticationModule {
    private static instance: AuthenticationModule;
    private apiClient : SentrixApiClient;

    constructor(client? : SentrixApiClient) {
        this.apiClient = client ?? sentrixApiClient;
    }

    public async loginDiscord(discordAccessToken : string) : Promise<LoginDiscordResponse> {
        const httpResponse = await this.apiClient.get<LoginDiscordResponse>("/v1/auth/login/discord")
        return httpResponse.data;
    }

    public async linkRoblox(robloxAccessToken : string) : Promise<LinkRobloxResponse> {
        const httpResponse = await this.apiClient.get<LinkRobloxResponse>("/v1/auth/link/roblox")
        return httpResponse.data;
    }

    public async logout() : Promise<LogoutResponse> {
        const httpResponse = await this.apiClient.get<LogoutResponse>("/v1/auth/logout")
        return httpResponse.data;
    }
}