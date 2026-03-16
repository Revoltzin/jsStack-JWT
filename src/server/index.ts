import express from 'express'
import { SignUpController } from '../application/controllers/SignUpController.js'
import { SignUpUseCase } from '../application/useCases/SignUpUseCase.js'
import { SignInController } from '../application/controllers/SignInController.js'
import { SignInUseCase } from '../application/useCases/SignInUseCase.js'

const app = express()
app.use(express.json())

app.post('/sign-up', async (request, response) => {
    const SALT = 10
    const signUpUseCase = new SignUpUseCase(SALT)
    const signUpController = new SignUpController(signUpUseCase)

    const { statusCode, body } = await signUpController.handle({
        body: request.body
    })

    response.status(statusCode).json(body)
})

app.post('/sign-in', async (request, response) => {

    const signInUseCase = new SignInUseCase()
    const signInController = new SignInController(signInUseCase)

    const { statusCode, body } = await signInController.handle({
        body: request.body
    })

    response.status(statusCode).json(body)
})

app.listen(3001, () => {
    console.log('Server Running')
})
