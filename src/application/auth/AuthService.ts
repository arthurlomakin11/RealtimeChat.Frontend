import type { IRequestBuilder } from "@/adapters/request-builder/Steps";
import { IAuthService } from "./IAuthService";
import { inject, injectable } from "inversify";
import { UserProfile } from "@/domain/auth/UserProfile";
import { di_types } from "@/types";
import { SignInCommand } from "./SignInCommand";
import { RegisterCommand } from "./RegisterCommand";
import { Result } from "neverthrow";

@injectable()
export default class AuthService implements IAuthService {
    constructor(@inject(di_types.IRequestBuilder) private requestBuilder: IRequestBuilder) {}

    public async registerUser(command: RegisterCommand): Promise<Result<UserProfile, Error>> {
        const response = await this.requestBuilder
            .withRequestModel(command)
            .withResponseModel<Result<UserProfile, Error>>()
            .sendPost("http://localhost:5104/account/register");

        return response.mapErr(error => new Error(`Register user failed: ${error.message}`));
    }

    public async signInUser(command: SignInCommand): Promise<Result<UserProfile, Error>> {
        const response = await this.requestBuilder
            .withRequestModel(command)
            .withResponseModel<Result<UserProfile, Error>>()
            .sendPost("http://localhost:5104/account/login?useCookies=true&useSessionCookies=true");

        return response.mapErr(error => new Error(`Sign-in failed: ${error.message}`));
    }
}