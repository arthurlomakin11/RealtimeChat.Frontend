import { Method } from "axios";
import { IRequestModel } from "./IRequestModel";
import { Result } from "neverthrow";

interface IRequestBuilder extends IWithRequest, IBodyBuilderStep, IAddHeaderStep {}

interface IWithRequest extends IBodyBuilderStep {
    withRequestBody(body: string):IPreBodyBuilderStep
    withRequestModel(model: IRequestModel):IPreBodyBuilderStep
}

interface IAddHeaderStep extends IBodyBuilderStep {
    addHeader(name: string, value: string):IPreBodyBuilderStep
}

interface IPreBodyBuilderStep extends IAddHeaderStep, IWithRequest {}

interface IBodyBuilderStep {
    withResponseModel<T>(): IFinalStep<T>
    withRawResponse():IFinalStep<string>
}

interface IFinalStep<T> {
    send(httpMethod:Method, url: string):Promise<Result<T, Error>>;
    sendGet(url:string):Promise<Result<T, Error>>
    sendPost(url:string):Promise<Result<T, Error>>
}

export type {IRequestBuilder, IWithRequest, IPreBodyBuilderStep, IAddHeaderStep, IBodyBuilderStep, IFinalStep};