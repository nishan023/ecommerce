import express, {
    RequestHandler,
    NextFunction,
    Request,
    Response,
} from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import indexRouter from './routes/index.router' 
import buildError from './utils/build-error'
import {methodNotAllowed }from './middleware/errors.middleware'
import swaggerJSDoc from 'swagger-jsdoc'

const app = express()

// Middleware to parse incoming JSON requests
app.use(express.json())

const port = process.env.PORT || 3000;


//swagger

const options: swaggerJsdoc.Options = {
    definition: {
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                },
            },
        },
        openapi: '3.0.0',
        info: {
            title: 'Express starter',
            version: '1.0.0',
        },

        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
        security: [{ BearerAuth: [] }], // Add security definition here
    },
    apis: ['./src/routes/*.ts'],
}

const specs = swaggerJsdoc(options)
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
        explorer: true,
    })
)


// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

// Use the router defined in index.router.ts
app.use(indexRouter)
app.use(methodNotAllowed)

// Error handler middleware to handle and respond to errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // Build a standardized error object using the buildError utility
    const error = buildError(err)

    // Set the HTTP status code based on the error code
    res.status(error.code).json({ error })
})

// Export the Express app for external use (e.g., testing)
export default app
