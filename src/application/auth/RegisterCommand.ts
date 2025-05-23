import {IRequestModel} from "@/adapters/request-builder/IRequestModel";

class RegisterCommand implements IRequestModel {
    constructor(login: string, password: string) {
        this.login = login;
        this.password = password;
    }

    login:string;
    password:string;
}

export {RegisterCommand}