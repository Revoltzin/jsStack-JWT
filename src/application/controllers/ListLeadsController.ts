import type { IController, IRequest, IResponse } from "../interfaces/IController.js";

export class ListLeadsController implements IController {
    async handle(request: IRequest): Promise<IResponse> {
        return {
            statusCode: 200,
            body: {
                leads: [
                    { id: 1, name: 'Math'},
                    { id: 2, name: 'Carlos'},
                    { id: 3, name: 'Zé'},
                ]
            }
        }
    }
}
