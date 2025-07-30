// src/core/utils/logs/logger.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private context?: string;

  setContext(context: string) {
    this.context = context;
    return this;
  }

  log(message: string) {
    this.print('LOG', message);
  }

  error(message: string, trace?: string) {
    this.print('ERROR', message, trace);
  }

  warn(message: string) {
    this.print('WARN', message);
  }

  private print(level: string, message: string, trace?: string) {
    const timestamp = new Date().toISOString();
    const ctx = this.context ? `[${this.context}] ` : '';
    const colors = {
      LOG: '\x1b[32m',
      WARN: '\x1b[33m',
      ERROR: '\x1b[31m'
    };
    
    const color = colors[level as keyof typeof colors] || '\x1b[0m';
    const logLevel = level.toLowerCase() as keyof Console;

    // Usar una verificación de tipo para evitar el error
    switch (level) {
      case 'ERROR':
        console.error(
          `${color}${timestamp} [${level}] ${ctx}${message}\x1b[0m`,
          trace ? `\n${trace}` : ''
        );
        break;
      case 'WARN':
        console.warn(
          `${color}${timestamp} [${level}] ${ctx}${message}\x1b[0m`,
          trace ? `\n${trace}` : ''
        );
        break;
      case 'LOG':
      default:
        console.log(
          `${color}${timestamp} [${level}] ${ctx}${message}\x1b[0m`,
          trace ? `\n${trace}` : ''
        );
        break;
    }
  }
}