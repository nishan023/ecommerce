/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, {
    RequestHandler,
    NextFunction,
    Request,
    Response,
} from 'express'

import todosRouter from './routes/todo.router'
import userRouter from './routes/auth.router'
import buildError from './utils/build-error'
const app = express()

app.use(express.json())
const port = 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.use('/todos', todosRouter)
app.use('/user', userRouter)

//Error handler

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const error = buildError(err)
    res.status(error.code).json({ error })
})

export default app
