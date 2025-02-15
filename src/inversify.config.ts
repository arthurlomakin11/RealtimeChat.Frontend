import {Container} from 'inversify';
import {IAuthService} from "@/application/auth/IAuthService";
import AuthService from "@/application/auth/AuthService";
import {IRequestBuilder} from "@/adapters/request-builder/Steps";
import {RequestBuilder} from "@/adapters/request-builder/RequestBuilder";
import { diTypes } from './types';
import { getConfig, IConfig } from './config';

const container = new Container();

container
    .bind<IConfig>(diTypes.AppConfig)
    .toConstantValue(getConfig());

container
	.bind<IRequestBuilder>(diTypes.IRequestBuilder)
	.to(RequestBuilder);

container
    .bind<IAuthService>(diTypes.IAuthService)
    .to(AuthService);

export { container };