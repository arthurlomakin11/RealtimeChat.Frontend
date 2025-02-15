import { IAuthService } from "@/application/auth/IAuthService";
import { diTypes } from "@/types";
import { InjectableComponent } from "@/utils/injectableComponent";
import { useAsync } from "@/utils/useAsync";

const AuthorizedViewRaw = ({ authService }: { authService: IAuthService }) => {
    const { result } = useAsync(() =>
        authService.isSignedIn()
    );

    if (result == null) {
        return <div></div>;
    }

    const isSignedIn = result.andThen(innerResult => innerResult).unwrapOr(false);
    return <div>{isSignedIn.toString()}</div>;
}

const AuthorizedView = InjectableComponent(AuthorizedViewRaw, {
    authService: diTypes.IAuthService
});

export { AuthorizedView }