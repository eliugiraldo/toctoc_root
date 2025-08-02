import { 
  ExceptionFilter, 
  Catch, 
  ArgumentsHost, 
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HTTP_STATUS } from '@shared/constants/http.constants';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Determinar código de estado
    const status = exception instanceof HttpException 
      ? exception.getStatus() 
      : HTTP_STATUS.INTERNAL_SERVER_ERROR;

    // Mensaje base
    const message = exception instanceof HttpException 
      ? exception.message 
      : 'Internal server error';

    // En producción, ocultar detalles sensibles
    const isProd = process.env.NODE_ENV === 'production';
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: isProd && status === HTTP_STATUS.INTERNAL_SERVER_ERROR
        ? 'Internal server error'
        : message,
    };

    response.status(status).json(errorResponse);
  }
}











// --- CÓDIGO ORIGINAL COMENTADO ---
// 
// import { 
//   ExceptionFilter, 
//   Catch, 
//   ArgumentsHost, 
//   HttpException,
//   HttpStatus 
// } from '@nestjs/common';
// import { Request, Response } from 'express';
// import { HTTP_STATUS } from '@shared/constants/http.constants';
// 
// @Catch()
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: unknown, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
// 
//     const status = exception instanceof HttpException 
//       ? exception.getStatus() 
//       : HttpStatus.INTERNAL_SERVER_ERROR;
// 
//     const errorResponse = {
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       path: request.url,
//       message: exception instanceof HttpException 
//         ? exception.message 
//         : 'Internal server error'
//     };
// 
//     response.status(status).json(errorResponse);
//   }
// }
//
// Cambios realizados:
// - Uso de HTTP_STATUS en lugar de HttpStatus (para centralización)
// - Manejo de entorno (producción vs desarrollo) para enmascarar errores
// - Este nivel de manejo de errores será ampliado en Fase 22 (auditoría, logging)
// - El uso de HttpStatus directo no es recomendado; se prefiere la constante propia.