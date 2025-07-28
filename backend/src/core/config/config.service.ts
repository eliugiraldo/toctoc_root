import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  /**
   * Get a configuration value with optional default
   * @param key The configuration key
   * @param defaultValue Optional default value
   * @returns The configuration value or default value
   */
  get<T = any>(key: string): T | undefined;
  get<T = any>(key: string, defaultValue: T): T;
  get<T = any>(key: string, defaultValue?: T): T | undefined {
    // Solución que funciona con la API real de @nestjs/config
    const value = this.nestConfigService.get<T>(key);
    
    // Si no hay valor y se proporcionó default, retornar default
    if (value === undefined && defaultValue !== undefined) {
      return defaultValue;
    }
    
    // Si no hay valor y no hay default, retornar undefined
    if (value === undefined && defaultValue === undefined) {
      return undefined;
    }
    
    return value;
  }

  /**
   * Get a required configuration value (throws if not found)
   * @param key The configuration key
   * @returns The configuration value
   */
  getOrThrow<T = any>(key: string): T {
    const value = this.get<T>(key);
    if (value === undefined) {
      throw new Error(`Configuration key "${key}" is required but not found`);
    }
    return value;
  }

  /**
   * Check if a configuration key exists
   * @param key The configuration key
   * @returns boolean indicating if key exists
   */
  has(key: string): boolean {
    return this.nestConfigService.get(key) !== undefined;
  }
}