import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class SensorService {
  constructor(private prisma: PrismaService) {}

  private API_URL = 'https://moriahmkt.com/iotapp/test/';

  
  async fetchAndStoreSensorData() {
    try {
      const response = await axios.get(this.API_URL);
      const sensores = response.data?.sensores;
      const parcelasAPI = response.data?.parcelas;

      if (!sensores || !parcelasAPI?.length) {
        console.error("⚠ No se recibieron datos válidos.");
        return;
      }

      const { temperatura, humedad, lluvia, sol } = sensores;

      const parcelaId = parcelasAPI[0].id; 

      const last = await this.prisma.historicoSensor.findFirst({
        where: { parcelaId },
        orderBy: { fecha: 'desc' },
      });

      const datosCambiaron =
        !last ||
        last.temperatura !== temperatura ||
        last.humedad !== humedad ||
        last.lluvia !== lluvia ||
        last.intensidad_solar !== sol;

      if (datosCambiaron) {
        await this.prisma.historicoSensor.create({
          data: {
            temperatura,
            humedad,
            lluvia,
            intensidad_solar: sol,
            fecha: new Date(),
            parcelaId,
          },
        });

        console.log('✅ Nuevo registro guardado en historialSensor.');
      } else {
        console.log('ℹ No hubo cambios en los datos de sensores.');
      }
    } catch (error: any) {
      console.error('❌ Error al obtener los datos de sensores:', error.message);
    }
  }

  
  async fetchAndStoreParcelas() {
    try {
      const response = await axios.get(this.API_URL);
      const parcelasAPI = response.data?.parcelas;

      if (!parcelasAPI?.length) {
        console.error("⚠ No se encontraron parcelas en la API.");
        return;
      }

      for (const parcela of parcelasAPI) {
        const existing = await this.prisma.parcela.findUnique({
          where: { id: parcela.id },
        });

        if (!existing) {
          await this.prisma.parcela.create({
            data: {
              id: parcela.id,
              nombre: parcela.nombre,
              tipo_cultivo: parcela.tipo_cultivo,
              responsable: parcela.responsable,
              latitud: parcela.latitud,
              longitud: parcela.longitud,
              ultimo_riego: new Date(parcela.ultimo_riego),
            },
          });

          console.log(`🌱 Parcela registrada: ${parcela.nombre}`);
        } else {
          
          if (
            existing.latitud !== parcela.latitud ||
            existing.longitud !== parcela.longitud
          ) {
            await this.prisma.parcela.update({
              where: { id: parcela.id },
              data: {
                latitud: parcela.latitud,
                longitud: parcela.longitud,
                ultimo_riego: new Date(parcela.ultimo_riego),
              },
            });

            console.log(`📍 Parcela actualizada: ${parcela.nombre}`);
          }
        }
      }

      console.log("✅ Parcelas sincronizadas correctamente.");
    } catch (error: any) {
      console.error('❌ Error al sincronizar parcelas:', error.message);
    }
  }

  
  async fetchAndStoreParcelasEliminadas() {
    try {
      const response = await axios.get(this.API_URL);
      const parcelasAPIIds = response.data?.parcelas?.map((p: any) => p.id) || [];

      const parcelasDB = await this.prisma.parcela.findMany();
      const eliminadas = parcelasDB.filter(p => !parcelasAPIIds.includes(p.id));

      for (const parcela of eliminadas) {
        const yaExiste = await this.prisma.parcelaEliminada.findFirst({
          where: {
            nombre: parcela.nombre,
            responsable: parcela.responsable,
            tipo_cultivo: parcela.tipo_cultivo,
          },
        });

        if (!yaExiste) {
          await this.prisma.parcelaEliminada.create({
            data: {
              nombre: parcela.nombre,
              tipo_cultivo: parcela.tipo_cultivo,
              responsable: parcela.responsable,
              latitud: parcela.latitud,
              longitud: parcela.longitud,
              ultimo_riego: parcela.ultimo_riego,
              fechaEliminada: new Date(),
            },
          });

          await this.prisma.parcela.delete({
            where: { id: parcela.id },
          });

          console.log(`🗑️ Parcela eliminada registrada: ${parcela.nombre}`);
        }
      }

      console.log("✅ Parcelas eliminadas sincronizadas.");
    } catch (error: any) {
      console.error('❌ Error al verificar parcelas eliminadas:', error.message);
    }
  }

  
  async getDashboardData() {
    const lastRecord = await this.prisma.historicoSensor.findFirst({
      orderBy: { fecha: 'desc' },
    });

    const parcelas = await this.prisma.parcela.findMany();

    return { lastRecord, parcelas };
  }

 
  async getHistorial() {
    return this.prisma.historicoSensor.findMany({
      orderBy: { fecha: 'asc' },
    });
  }

  
  async getParcelasEliminadas() {
    return this.prisma.parcelaEliminada.findMany({
      orderBy: { fechaEliminada: 'asc' },
    });
  }
}
