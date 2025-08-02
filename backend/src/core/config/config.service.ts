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
  get<T = any>(key: string, defaultValue?: T): T | undefined {
    // La solución es usar una aserción de tipo explícita para ayudar a TypeScript
    return (this.nestConfigService.get as any)(key, defaultValue);
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
   * Get a configuration value as a number
   * @param key The configuration key
   * @returns The numeric value
   * @throws Error if value is not a valid number
   */
  getNumber(key: string): number {
    const value = this.getOrThrow<string>(key);
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
      throw new Error(`Config error: "${key}" must be a number`);
    }
    return numberValue;
  }

  /**
   * Get a configuration value as a boolean
   * @param key The configuration key
   * @returns The boolean value
   * @throws Error if value is not "true" or "false"
   */
  getBoolean(key: string): boolean {
    const value = this.getOrThrow<string>(key);
    if (value === 'true') return true;
    if (value === 'false') return false;
    throw new Error(`Config error: "${key}" must be "true" or "false"`);
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