import {IAuthService} from "@/application/auth/IAuthService";
import {container} from "@/inversify.config";
import {di_types} from "@/types";
import {useInjection} from "inversify-react";

export default function RegisterUserRequest() {
    console.log(container);
    const authService = useInjection<IAuthService>(di_types.IAuthService);
    let result = authService.signInUser("mail@mail.com", "Password12345.")
        .then(r => console.log(r))
        .catch(r => console.log(r));
    return result;
}