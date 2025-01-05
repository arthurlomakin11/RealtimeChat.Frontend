import React, {ReactNode} from "react";
import RegisterUserRequest from "@/use-cases/RegisterUser/RegisterUserUseCase";

const AuthorizedView = () => {
    let x = RegisterUserRequest();
    return <div></div>;
}

export {AuthorizedView}