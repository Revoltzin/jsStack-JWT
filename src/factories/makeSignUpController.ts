import { SignUpController } from '../application/controllers/SignUpController.js'
import { makeSignUpUseCase } from './makeSignUpUseCase.js'

export function makeSignUpController() {
    const signUpUseCase = makeSignUpUseCase()
    return new SignUpController(signUpUseCase)
}
