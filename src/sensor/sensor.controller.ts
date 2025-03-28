import { Controller, Get } from '@nestjs/common';
import { SensorService } from './sensor.service';

@Controller('sensores')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  // 🌡️ Datos para el Dashboard (último registro + parcelas activas)
  @Get('dashboard')
  async getDashboardData() {
    return await this.sensorService.getDashboardData();
  }

  // 📈 Historial de sensores
  @Get('historial')
  async getHistorial() {
    return await this.sensorService.getHistorial();
  }

  // 🗃️ Parcelas eliminadas
  @Get('eliminadas')
  async getParcelasEliminadas() {
    return await this.sensorService.getParcelasEliminadas();
  }

  // 🔁 Endpoint manual para sincronizar sensores y parcelas
  @Get('sync')
  async syncAll() {
    await this.sensorService.fetchAndStoreSensorData();
    await this.sensorService.fetchAndStoreParcelas();
    await this.sensorService.fetchAndStoreParcelasEliminadas();
    return { message: '✅ Sincronización completada' };
  }
}
