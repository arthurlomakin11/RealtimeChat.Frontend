import { Method } from "axios";
import { IFinalStep } from "./Steps";
import { IRequestBuilderSettings } from "./IRequestBuilderSettings";
import { Result } from "neverthrow";

type sendActionFunction = (settings: IRequestBuilderSettings, method: Method, url: string) => Promise<Result<string, Error>>;

class ModelRequestBodyBuilder<T> implements IFinalStep<T> {
    constructor(
        private settings: IRequestBuilderSettings,
        private sendAction: sendActionFunction
    ) {}

    public async send(httpMethod: Method, url: string): Promise<Result<T, Error>> {
        const response = await this.sendAction(this.settings, httpMethod, url);
        return response.map(data => JSON.parse(data) as T);
    }

    public async sendGet(url: string): Promise<Result<T, Error>> {
        return this.send("GET", url);
    }

    public async sendPost(url: string): Promise<Result<T, Error>> {
        return this.send("POST", url);
    }
}

export { ModelRequestBodyBuilder };