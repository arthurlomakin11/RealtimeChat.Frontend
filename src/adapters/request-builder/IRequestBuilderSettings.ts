import {AxiosHeaders, RawAxiosRequestHeaders} from "axios";

interface IRequestBuilderSettings {
    Headers: RawAxiosRequestHeaders | AxiosHeaders;
    RequestBody: string | null;
}

export type {IRequestBuilderSettings};