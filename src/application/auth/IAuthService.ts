import { UserProfile } from "@/domain/auth/UserProfile"
import { SignInCommand } from "./SignInCommand"
import { RegisterCommand } from "./RegisterCommand"
import { Result } from "neverthrow"

interface IAuthService {
    registerUser(command: RegisterCommand):Promise<Result<UserProfile, Error>>
    signInUser(command: SignInCommand): Promise<Result<UserProfile, Error>>
    isSignedIn():Promise<Result<boolean, Error>>
}

export type {IAuthService}