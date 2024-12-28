type RegisterUserCommand = {
    login: string,
    password: string
}

const registerUserUseCase = (command:RegisterUserCommand) => {
    let registerAnswer = await this.requestBuilder
        .withRequestBody(command)
        .addHeader("x", "y")
        .withResponseModel<UserProfile>()
        .sendGet("");
};