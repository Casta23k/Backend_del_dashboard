import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SensorService {
  private apiUrl = 'https://moriahmkt.com/iotapp/test/';

  async obtenerDatosSensores() {
    try {
      const response = await axios.get(this.apiUrl);

      const datos = response.data;

      return {
        temperatura: datos.temperatura,
        humedad: datos.humedad,
        lluvia: datos.lluvia,
        intensidadSolar: datos.intensidadSolar,
      };
    } catch (error) {
      console.error('Error al obtener datos de sensores:', error);
      throw new Error('No se pudo obtener la información del sensor');
    }
  }
}
