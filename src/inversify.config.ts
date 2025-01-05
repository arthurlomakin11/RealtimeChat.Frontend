import {Container} from 'inversify';
import {IAuthService} from "@/application/auth/IAuthService";
import AuthService from "@/application/auth/AuthService";
import {IRequestBuilder} from "@/adapters/request-builder/Steps";
import {RequestBuilder} from "@/adapters/request-builder/RequestBuilder";
import { di_types } from './types';

const container = new Container();

container
	.bind<IRequestBuilder>(di_types.IRequestBuilder)
	.to(RequestBuilder);

container
    .bind<IAuthService>(di_types.IAuthService)
    .to(AuthService);

export { container };