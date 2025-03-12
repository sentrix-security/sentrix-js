export type PaginatedResult<T> = {
    page: number;
    pageSize: number;
    totalCount: number;
    items: T[]
}
export type PaginatedRequestParams = {
    page?: number;
    pageSize?: number;
    filterField?: string;
    filterMode?: PaginationFilterMode;
    filter?: string;
}
export type PaginationFilterMode =
    "CONTAINS" |
    "GREATER_THAN" |
    "LESS_THAN" |
    "DATE_RANGE" |
    "EQUALS"
export type EnumWhitelistType =
    "GROUP" |
    "USER"
