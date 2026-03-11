import { z, ZodError } from 'zod'

import type { IController, IRequest, IResponse } from "../interfaces/IController.js";
import { SignUpUseCase } from '../useCases/SignUpUseCase.js';

const schema = z.object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(8),
})

export class SignUpController implements IController {
    constructor(private readonly signUpUseCase: SignUpUseCase) {}

    async handle({ body }: IRequest): Promise<IResponse> {
        try {
            const { email, name, password } = schema.parse(body)

            await this.signUpUseCase.execute({ email, name, password})

            return {
                statusCode: 201,
                body: { message: 'Usuário criado com sucesso' },
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
