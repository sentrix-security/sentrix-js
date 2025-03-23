import sentrixApiClient, {SentrixApiClient} from "../client";

export type DiscordUser = {
    "id": string,
    "username": string,
    "discriminator": string,
    "avatar": string,
    "verified": boolean | undefined,
    "email": string | undefined,
    "flags": number | undefined,
    "banner": string | undefined,
    "accent_color": number | undefined,
    "premium_type": number | undefined,
    "public_flags": number | undefined,
}

export type PermissionsObject = {
    permissions_staff: number,
    permissions_admin: number,
    permissions_hub: {
        [key: number]: number
    }
}

export type LoginDiscordResponse = {
    success: boolean;
    access_token: string;
    discord_user: DiscordUser,
    sentrix_user: {
        id: number,
        username: string,
        roblox_user_id: string,
    },
    permissions: PermissionsObject,
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
        const httpResponse = await this.apiClient.post<LoginDiscordResponse>("/v1/auth/login/discord")
        return httpResponse.data;
    }

    public async linkRoblox(robloxAccessToken : string) : Promise<LinkRobloxResponse> {
        const httpResponse = await this.apiClient.post<LinkRobloxResponse>("/v1/auth/link/roblox")
        return httpResponse.data;
    }

    public async logout() : Promise<LogoutResponse> {
        const httpResponse = await this.apiClient.post<LogoutResponse>("/v1/auth/logout")
        return httpResponse.data;
    }
}