import {Container} from 'inversify';
import {AuthService} from './services/AuthService';
import {IAuthService} from "./application/auth/IAuthService";
import {nameof} from "./utils/nameof";

const container = new Container();

container
    .bind<IAuthService>(nameof<AuthService>())
    .to(nameof<AuthService>());

export { container };