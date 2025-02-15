import { Method } from "axios";
import { IFinalStep } from "./Steps";
import { IRequestBuilderSettings } from "./IRequestBuilderSettings";
import { Result } from "neverthrow";
import { sendActionFunction } from "../sendActionFunction";

class RawRequestBodyBuilder implements IFinalStep<string> {
    constructor(
        private settings: IRequestBuilderSettings,
        private sendAction: sendActionFunction
    ) {}

    public async send(httpMethod: Method, url: string): Promise<Result<string, Error>> {
        const response = await this.sendAction(this.settings, httpMethod, url);
        return response.map(data => data);
    }

    public async sendGet(url: string): Promise<Result<string, Error>> {
        return this.send("GET", url);
    }

    public async sendPost(url: string): Promise<Result<string, Error>> {
        return this.send("POST", url);
    }
}

export { RawRequestBodyBuilder };