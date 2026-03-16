import express from 'express'
import { SignUpController } from '../application/controllers/SignUpController.js'
import { SignUpUseCase } from '../application/useCases/SignUpUseCase.js'

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

app.post('/sign-in', (request, response) => {
    response.status(200).json({
        message: 'SignIn'
    })
})

app.listen(3001, () => {
    console.log('Server Running')
})
