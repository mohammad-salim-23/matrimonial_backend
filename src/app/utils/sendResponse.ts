import { Response } from "express";
import { stat } from "node:fs";
type TResponse <T> = {
    statusCode: number;
    success: boolean;
    message: string;
    data?:T;
}
const sendResponse = <T>(res:Response, 
 data:TResponse<T>
)=>{
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        statusCode: data.statusCode,
        data: data.data
    });
};
export default sendResponse;