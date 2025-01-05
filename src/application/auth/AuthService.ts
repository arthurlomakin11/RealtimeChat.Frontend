import {IRequestBuilder} from "../../adapters/request-builder/Interfaces";
import {IAuthService} from "./IAuthService";
import {injectable} from "inversify";

@injectable()
export default class AuthService implements IAuthService {
    constructor(private requestBuilder:IRequestBuilder) {}

    public async registerUser(login: string, password: string) {
        let registerAnswer = await this.requestBuilder
            .withRequestBody(command)
            .addHeader("x", "y")
            .withResponseModel<UserProfile>()
            .sendGet("");
    };

    public signInUser() {
        let x = await this.requestBuilder
            .addHeader("x", "y")
            .withResponseModel<UserProfile>()
            .sendGet("");

    };
}