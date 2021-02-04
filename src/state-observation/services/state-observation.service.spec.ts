import { Test, TestingModule } from '@nestjs/testing';
import { StateObservationService } from './state-observation.service';

describe('StateObservationService', () => {
  let service: StateObservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StateObservationService],
    }).compile();

    service = module.get<StateObservationService>(StateObservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
