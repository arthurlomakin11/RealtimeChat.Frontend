import { Method } from "axios";
import { IRequestBuilderSettings } from "./request-builder/IRequestBuilderSettings";
import { Result } from "neverthrow";

export type sendActionFunction = (settings: IRequestBuilderSettings, method: Method, url: string) 
    => Promise<Result<string, Error>>;