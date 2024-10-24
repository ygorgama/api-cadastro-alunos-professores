import express, { Request, Response, NextFunction  } from "express";
import cors from 'cors';
import helmet from "helmet";

import authRoute from './routes/auth'; 
import roomsRoute from './routes/rooms'; 
import teacherRoute from './routes/teacher'; 
import studentRoute from './routes/student'; 
import ErrorHandler from "./error-handler/ErrorHandler";
import { authenticate } from "./middleware/authenticate";
import swaggerUI from "swagger-ui-express";
import swaggerDocs from './swagger.json'

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.get('/', authenticate ,authenticate ,(req: Request, res: Response) => {
    return res.json({
        message: "Server online"
    })
})

app.use('/v1/auth', authRoute);
app.use('/v1/rooms', roomsRoute);
app.use('/v1/teachers', teacherRoute);
app.use('/v1/students', studentRoute);

app.use((error: ErrorHandler, req: Request, res:Response, next:NextFunction) => {
    const message = error.message;
    const statusCode = error.statusCode;
    res.status(statusCode).json({
        message:  message,
        statusCode: statusCode
    })
    
    return next();
})

export default app;