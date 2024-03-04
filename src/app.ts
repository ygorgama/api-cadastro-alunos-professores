import express, { Request, Response, NextFunction  } from "express";
import cors from 'cors';
import helmet from "helmet";

import authRoute from './routes/auth'; 
import roomsRoute from './routes/rooms'; 
import ErrorHandler from "./error-handler/ErrorHandler";
import { authenticate } from "./middleware/authenticate";

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());

app.get('/', authenticate ,authenticate ,(req: Request, res: Response) => {
    return res.json({
        message: "Server online"
    })
})

app.use('/v1/auth', authRoute);
app.use('/v1/rooms', roomsRoute);

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