import {useInjection} from "useInjection";

const RegisterUserRequest = () => {
    const authService = useInjection<IAuthService>();
    let result = await authService.registerUser(command.login, command.password);
}