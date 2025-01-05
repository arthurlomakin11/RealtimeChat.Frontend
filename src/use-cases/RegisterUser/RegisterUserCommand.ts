import {RequestData} from "mediatr-ts";

class RegisterUserCommand extends RequestData<string> {
    login: string;
    password: string;
}

export {RegisterUserCommand};