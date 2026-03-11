import { z, ZodError } from 'zod'

import type { IController, IRequest, IResponse } from "../interfaces/IController.js";
import { SignInUseCase } from '../useCases/SignInUseCase.js';

const schema = z.object({
    email: z.email(),
    password: z.string().min(8),
})

export class SignInController implements IController {
    constructor(private readonly signInUseCase: SignInUseCase) {}

    async handle({ body }: IRequest): Promise<IResponse> {
        try {
            const { email, password } = schema.parse(body)

            const { accessToken } = await this.signInUseCase.execute({ email, password})

            return {
                statusCode: 200,
                body: {
                    accessToken,
                 },
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
