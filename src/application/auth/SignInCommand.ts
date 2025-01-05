import {IRequestModel} from "@/adapters/request-builder/IRequestModel";

class SignInCommand implements IRequestModel {
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    email:string;
    password:string;
}

export {SignInCommand}