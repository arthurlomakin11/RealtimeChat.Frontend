import axios, { Method } from "axios";
import { IFinalStep, IPreBodyBuilderStep, IRequestBuilder } from "./Steps";
import { ModelRequestBodyBuilder } from "./ModelRequestBodyBuilder";
import { IRequestBuilderSettings } from "./IRequestBuilderSettings";
import { IRequestModel } from "./IRequestModel";
import { Result, ok, err } from "neverthrow";
import { RawRequestBodyBuilder } from "./RawRequestBodyBuilder";

class RequestBuilder implements IRequestBuilder {
    private _settings: IRequestBuilderSettings = {
        Headers: {},
        RequestBody: null
    };

    addHeader(name: string, value: string): IPreBodyBuilderStep {
        this._settings.Headers[name] = value;
        return this;
    }

    withRequestBody(body: string): IPreBodyBuilderStep {
        this._settings.RequestBody = body;
        return this;
    }

    withRequestModel(model: IRequestModel): IPreBodyBuilderStep {
        this._settings.RequestBody = JSON.stringify(model);
        return this;
    }

    withResponseModel<T>(): IFinalStep<T> {
        return new ModelRequestBodyBuilder<T>(this._settings, this.send);
    }

    withRawResponse(): IFinalStep<string> {
        return new RawRequestBodyBuilder(this._settings, this.send);
    }

    private async send(settings: IRequestBuilderSettings, method: Method, url: string): Promise<Result<string, Error>> {
        try {
            const response = await axios.request<string>({
                url: url,
                headers: settings.Headers,
                data: settings.RequestBody,
                method: method,
                responseType: "text",
                withCredentials: true
            });
            return ok(response.data);
        }
        catch (error) {
            return err(error instanceof Error ? error : new Error("Unknown error occurred"));
        }
    }
}

export { RequestBuilder };