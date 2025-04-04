import sentrixApiClient, {SentrixApiClient} from "../client";
import {EnumWhitelistType, PaginatedRequestParams, PaginatedResult} from "../common/commonTypes";
import {ListHubPurchasesRecord} from "./Hubs";

export type UserRecord = {
    id: number,
    username: string,
    roblox_user_id: string | undefined,
    discord_user_id: string,
    email: string,
    email_verified: boolean,

    created_manually: boolean,
    active: boolean,
}
export type UpdateCurrentUserRecord = Omit<UserRecord, "roblox_user_id" | "discord_user_id" | "email_verified" | "active" | "created_manually">

export type UpdateCurrentUserData = {
    email?: string | undefined;
    username?: string | undefined;
}

export class UsersModule {
    private static instance: UsersModule;
    private apiClient : SentrixApiClient;

    constructor(client? : SentrixApiClient) {
        this.apiClient = client ?? sentrixApiClient;
    }

    public async getCurrentUser() : Promise<UserRecord> {
        const response = await this.apiClient.get<UserRecord>("/v1/users/@me")
        return response.data;
    }

    public async updateCurrentUser(data: UpdateCurrentUserData) : Promise<UpdateCurrentUserRecord> {
        const response = await this.apiClient.put<UpdateCurrentUserRecord>("/v1/users/@me" , {
            data: data
        });
        return response.data;
    }
}