
export type CommonApi = {
    message: string;
}

export type Errors = {
    path: string[];
    message: string;
}

export interface ApiError extends CommonApi {
    extraDetails?: string;
    errors?: Errors[]
}
export type ApiSuccess<K extends string, T> =
    CommonApi & {
        [P in K]: T;
    };
type FormValue =
    | string
    | number
    | boolean
    | File
    | Blob
    | null
    | undefined | {
        [key: string]: FormValue;
    };


export type FormDataAcceptable<T> = {
    [K in keyof T]?: FormValue | FormValue[];
}

export interface commonPagination {
    total: number;
    nextPage: number | null;
}

export type PaginatedResponse<K extends string, T> = ApiSuccess<K, T[]> & {
    total: number;
    nextPage: number | null;
    pageCount: number;
}