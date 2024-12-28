import {Method} from "axios";
import {IFinalStep} from "./Interfaces";

type sendActionFunction = (method:Method, url: string) => Promise<string>;

class ModelRequestBodyBuilder<T> implements IFinalStep<T> {
    private readonly _sendAction: sendActionFunction;

    constructor(sendAction: sendActionFunction) {
        this._sendAction = sendAction;
    }

    public async send(httpMethod:Method, url: string):Promise<T> {
        let response = await this._sendAction(httpMethod, url);
        return response.json() as T;
    }

    public async sendGet(url: string): Promise<T> {
        return this.send("GET", url);
    }

    public async sendPost(url: string): Promise<T> {
        return this.send("POST", url);
    }
}

export {ModelRequestBodyBuilder};