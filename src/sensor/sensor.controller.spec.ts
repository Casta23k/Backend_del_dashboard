import { Test, TestingModule } from '@nestjs/testing';
import { ParcelasController } from './sensor.controller';

describe('ParcelasController', () => {
  let controller: ParcelasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParcelasController],
    }).compile();

    controller = module.get<ParcelasController>(ParcelasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
