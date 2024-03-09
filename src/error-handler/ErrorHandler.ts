import ErrorHandlerInterface from "./interface/ErrorInterface";

class ErrorHandler extends Error implements ErrorHandlerInterface{
    statusCode: number;
    constructor(msg: string){
        super(msg);
        this.statusCode = 500;
    }

    setStatusCode(statusCode:number){
        this.statusCode = statusCode;
    }
}

export default ErrorHandler;