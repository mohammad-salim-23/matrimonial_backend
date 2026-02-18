class AppError extends Error {
    public statusCode: number;
    
    constructor(statusCode: number, message: string, stack=''){
        super(message);
        this.statusCode = statusCode;
        if(stack){ // Stack Trace: it's give message where the error is occured
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
            // if stack is not provided, capture the current stack trace and insert it's own constructor function
        }
    }
}
export default AppError;