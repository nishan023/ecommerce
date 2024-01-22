import express, {
    RequestHandler,
    NextFunction,
    Request,
    Response,
} from 'express'
import indexRouter from './routes/index.router'
import buildError from './utils/build-error'

const app = express()

// Middleware to parse incoming JSON requests
app.use(express.json())

const port = 3000

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

// Use the router defined in index.router.ts
app.use(indexRouter)

// Error handler middleware to handle and respond to errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // Build a standardized error object using the buildError utility
    const error = buildError(err)

    // Set the HTTP status code based on the error code
    res.status(error.code).json({ error })
})

// Export the Express app for external use (e.g., testing)
export default app
