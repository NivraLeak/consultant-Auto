import { Test, TestingModule } from '@nestjs/testing';
import { StateObservationController } from './state-observation.controller';

describe('StateObservationController', () => {
  let controller: StateObservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StateObservationController],
    }).compile();

    controller = module.get<StateObservationController>(StateObservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
