// src/core/common/filters/http-exception.filter.ts
import { 
  ExceptionFilter, 
  Catch, 
  ArgumentsHost, 
  HttpException,
  HttpStatus 
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HTTP_STATUS } from '@shared/constants/http.constants';
import { LoggerService } from '@core/utils/logs/logger.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    // Determinar código de estado
    const status = exception instanceof HttpException 
      ? exception.getStatus() 
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // Formato de respuesta estandarizado
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...(exception instanceof HttpException 
        ? { message: exception.getResponse() } 
        : { message: 'Internal server error' })
    };

    // Registrar error con mejor formato de mensaje
    const logMessage = `HTTP Exception [${status}] ${request.method} ${request.url}`;
    const errorMessage = exception instanceof HttpException 
      ? JSON.stringify(exception.getResponse())
      : 'Internal server error';

    if (status >= 500) {
      this.logger.error(
        `${logMessage} - ${errorMessage}`,
        exception instanceof Error ? exception.stack : undefined,
        'HTTP_FILTER'
      );
    } else {
      this.logger.warn(`${logMessage} - ${errorMessage}`, 'HTTP_FILTER');
    }

    // Enviar respuesta al cliente
    response.status(status).json(errorResponse);
  }
}