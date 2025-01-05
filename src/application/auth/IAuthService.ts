import { UserProfile } from "@/domain/auth/UserProfile"
import { SignInCommand } from "./SignInCommand"
import { RegisterCommand } from "./RegisterCommand"

interface IAuthService {
    registerUser(command: RegisterCommand):Promise<UserProfile>
    signInUser(command: SignInCommand):Promise<UserProfile>
}

export type {IAuthService}