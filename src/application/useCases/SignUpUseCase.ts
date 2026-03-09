import { PrismaClient } from '@prisma/client'
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists.js'

interface IInput {
    name: string
    email: string
    password: string
}

type IOutput = void

export class SignUpUseCase {
    async execute({ name, email, password }: IInput): Promise<IOutput> {
        const prismaClient = new PrismaClient()

        const accountAlreadyExists = await prismaClient.account.findUnique({
            where: {
                email: { email }
            },
        })

        if (accountAlreadyExists) {
            throw new AccountAlreadyExists()
        }

        await prismaClient.account.create({
            data: {
                email,
                name,
                password
            },
        })
    }
}
