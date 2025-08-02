import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  getHealth(): { status: string } {
    return { status: 'ok' };
  }
}

/*
// Código original comentado - NO PERTENECE A FASE 0
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

NOTA: El código original pertenece a una implementación más avanzada:
- Uso de AppService: Fase 0 pero no necesario para endpoint de salud
- Endpoint raíz `/`: No cumple con el requisito de tener un endpoint `/health`

En Fase 0, el controller debe tener un endpoint de salud simple sin lógica de negocio ni dependencias innecesarias.
*/