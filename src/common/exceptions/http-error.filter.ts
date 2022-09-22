import {
  ExceptionFilter,
  Catch,
  HttpStatus,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpExceptionResponse } from '../interfaces/http-exception-response.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode: HttpStatus = exception.getStatus();
    const errorMessage: string = exception.message;

    const resp: HttpExceptionResponse = {
      error: errorMessage,
    };

    response.status(statusCode).json(resp);
  }
}
