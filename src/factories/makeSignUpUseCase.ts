import { SignUpUseCase } from "../application/useCases/SignUpUseCase.js";

export function makeSignUpUseCase() {
    const SALT = 10

    return new SignUpUseCase(SALT)
}
