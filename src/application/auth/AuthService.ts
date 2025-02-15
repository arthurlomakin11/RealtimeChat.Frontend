import type { IRequestBuilder } from "@/adapters/request-builder/Steps";
import { IAuthService } from "./IAuthService";
import { inject, injectable } from "inversify";
import { UserProfile } from "@/domain/auth/UserProfile";
import { diTypes } from "@/types";
import { SignInCommand } from "./SignInCommand";
import { RegisterCommand } from "./RegisterCommand";
import { Result } from "neverthrow";
import type { IConfig } from "@/config";

@injectable()
export default class AuthService implements IAuthService {
    constructor(
        @inject(diTypes.IRequestBuilder) private requestBuilder: IRequestBuilder,
        @inject(diTypes.AppConfig) private config: IConfig
    ) { }

    public async registerUser(command: RegisterCommand): Promise<Result<UserProfile, Error>>
    {
        const response = await this.requestBuilder
            .withRequestModel(command)
            .withResponseModel<UserProfile>()
            .sendPost(`${this.config.baseUrl}/account/register`);

        return response.mapErr(error => new Error(`Register user failed: ${error.message}`));
    }

    public async signInUser(command: SignInCommand): Promise<Result<UserProfile, Error>> {
        const response = await this.requestBuilder
            .withRequestModel(command)
            .withResponseModel<UserProfile>()
            .sendPost(`${this.config.baseUrl}/account/login?useCookies=true&useSessionCookies=true`);

        return response.mapErr(error => new Error(`Sign-in failed: ${error.message}`));
    }

    public async isSignedIn(): Promise<Result<boolean, Error>>
    {
        const response = await this.requestBuilder
            .withRawResponse()
            .sendGet(`${this.config.baseUrl}/auth-ping`);
        
        return response
            .map(() => true)
            .mapErr(error => new Error(error.message));
    }
}