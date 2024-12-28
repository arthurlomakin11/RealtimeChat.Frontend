import axios, {Method} from "axios";
import {IBodyBuilderStep, IFinalStep, IPreBodyBuilderStep, IRequestBuilder} from "./Interfaces";
import {ModelRequestBodyBuilder} from "./ModelRequestBodyBuilder";
import {IRequestBuilderSettings} from "./IRequestBuilderSettings";

class RequestBuilder implements IRequestBuilder {
    private _settings:IRequestBuilderSettings = {
        Headers: {}, RequestBody: null
    };

    addHeader(name: string, value: string): IPreBodyBuilderStep {
        this._settings.Headers[name] = value;
        return this;
    }

    withRequestBody(body: string): IPreBodyBuilderStep {
        this._settings.RequestBody = body;
        return this;
    }

    withResponseModel<T>():IFinalStep<T> {
        return new ModelRequestBodyBuilder<T>(this.send);
    }

    private async send(method:Method, url: string):Promise<string> {
        let response = await axios.request({
            url: url,
            headers: this._settings.Headers,
            method: method,
            withCredentials: true
        });
        return response.data;
    }
}