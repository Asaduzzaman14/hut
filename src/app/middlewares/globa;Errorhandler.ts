import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import config from "../../config";
import { ZodError } from "zod";
import { IGenericErrorMessage } from "../../interfaces/error";
import handleValidationError from "../../errors/handelValidationError";
import handelZodError from "../../errors/handelZodError";
import handleCastError from "../../errors/handelcastError";
import ApiError from "../../errors/ApiError";

// global error handler
const globalErrorHandler: ErrorRequestHandler = (
     error,
     req: Request,
     res: Response,
     next: NextFunction
) => {
     console.log(`global error handller`, error);

     let statusCode = 500;
     let message = "Something went wrong";
     let errorMessages: IGenericErrorMessage[] = [];

     if (error?.name == "ValidationError") {
          const simplyfideError = handleValidationError(error);
          statusCode = simplyfideError.statusCode;
          message = simplyfideError.message;
          errorMessages = simplyfideError.errorMessages;
     }
     // Zod Error
     else if (error instanceof ZodError) {
          const simpliFideError = handelZodError(error);
          statusCode = simpliFideError.statusCode;
          message = simpliFideError.message;
          errorMessages = simpliFideError.errorMessages;
     }
     // CastError
     else if (error?.name === "CastError") {
          const simpliFideError = handleCastError(error);
          statusCode = simpliFideError.statusCode;
          message = simpliFideError.message;
          errorMessages = simpliFideError.errorMessages;
     }
     // api Error
     else if (error instanceof ApiError) {
          statusCode = error.statusCode;
          message = error?.message;
          errorMessages = error?.message
               ? [
                      {
                           path: "",
                           message: error.message,
                      },
                 ]
               : [];
     } else if (error instanceof Error) {
          message = error?.message;
          errorMessages = error?.message
               ? [
                      {
                           path: "",
                           message: error.message,
                      },
                 ]
               : [];
     }

     // send error
     res.status(statusCode).json({
          success: false,
          message,
          errorMessages,
          stack: config.env !== "production" ? error?.stack : undefined,
     });
};

export default globalErrorHandler;
