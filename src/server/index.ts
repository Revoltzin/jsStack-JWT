import express from 'express'
// import { SignUpController } from '../application/controllers/SignUpController.js'
// import { SignUpUseCase } from '../application/useCases/SignUpUseCase.js'
// import { SignInController } from '../application/controllers/SignInController.js'
// import { SignInUseCase } from '../application/useCases/SignInUseCase.js'
import { routeAdapter } from './adapters/routeAdapter.js'
import { makeSignUpController } from '../factories/makeSignUpController.js'

const app = express()
app.use(express.json())

app.post("/sign-up", routeAdapter(makeSignUpController()))

app.post("/sign-in", routeAdapter(makeSignUpController()))

app.listen(3001, () => {
    console.log('Server Running')
})
