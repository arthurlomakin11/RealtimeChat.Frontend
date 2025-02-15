import { IAuthService } from "@/application/auth/IAuthService";
import { diTypes } from "@/types";
import { injectableComponent } from "@/utils/injectableComponent";
import { ReactElement } from "react";
import { useAsync } from "react-use";

const AuthorizedViewRaw =
    ({ authService, Auth, NotAuth }: { authService: IAuthService, Auth: ReactElement, NotAuth: ReactElement }) => {
    const { value, error, loading } = useAsync(
        async () => authService.isSignedIn(),
        [authService]
    );

    if (loading) return <div>Loading...</div>;
    if (error || value === undefined) return <div>Error: {error?.message}</div>;

    const isSignedIn = value.unwrapOr(false);
    return isSignedIn ? Auth : NotAuth;
};

const AuthorizedView = injectableComponent(AuthorizedViewRaw, {
    authService: diTypes.IAuthService
});

export { AuthorizedView }