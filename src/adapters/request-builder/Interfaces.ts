import {Method} from "axios";

interface IRequestBuilder extends IWithRequest, IBodyBuilderStep, IAddHeaderStep {}

interface IWithRequest extends IBodyBuilderStep {
    withRequestBody(body: string):IPreBodyBuilderStep
}

interface IAddHeaderStep extends IBodyBuilderStep {
    addHeader(name: string, value: string):IPreBodyBuilderStep
}

interface IPreBodyBuilderStep extends IAddHeaderStep, IWithRequest {}

interface IBodyBuilderStep {
    withResponseModel<T>():IFinalStep<T>
}

interface IFinalStep<T> {
    send(httpMethod:Method, url: string):Promise<T>;
    sendGet(url:string):Promise<T>
    sendPost(url:string):Promise<T>
}

export type {IRequestBuilder, IWithRequest, IPreBodyBuilderStep, IAddHeaderStep, IBodyBuilderStep, IFinalStep};