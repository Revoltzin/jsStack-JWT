import { email, z, ZodError } from 'zod'

import type { IController, IRequest, IResponse } from "../interfaces/IController.js";
import { SignUpUseCase } from '../useCases/SignInUseCase.js';

const schema = z.object({
    name: z.string().min(2),
    email: z.email().min(1),
    password: z.string().min(8),
})

export class SignUpController implements IController {
    async handle({ body }: IRequest): Promise<IResponse> {
        try {
            const { email, name, password } = schema.parse(body)

            const signUpUseCase = new SignUpUseCase()
            await signUpUseCase.execute({ email, name, password})

            return {
                statusCode: 204,
                body: null,
            }
        } catch (error) {
            if (error instanceof ZodError) {
                return {
                    statusCode: 400,
                    body: error.issues,
                }
            }

            throw error
        }
    }
}
