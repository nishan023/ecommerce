import express from 'express'

import todosRouter from './routes/todo.router'
const app = express()

app.use(express.json())
const port = 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.use('/todos', todosRouter)
export default app
