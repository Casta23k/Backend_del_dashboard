import { Controller, Get } from '@nestjs/common';
import { SensorService } from './sensor.service';

@Controller('sensores')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get('dashboard')
  async obtenerDatosParaDashboard() {
    return await this.sensorService.obtenerDatosSensores();
  }
}
