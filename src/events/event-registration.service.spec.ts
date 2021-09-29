import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import config, { appEntities } from 'src/config';
import { EventRegistrationService } from './event-registration.service';

describe('EventsService', () => {
  let service: EventRegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          ...config.database,
          entities: [...appEntities],
          logging: 'all',
        }),
        TypeOrmModule.forFeature([...appEntities]),
      ],
      providers: [EventRegistrationService],
    }).compile();

    service = module.get<EventRegistrationService>(EventRegistrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to find all', async () => {
    const data = await service.findAll({ groupId: 2 });

    expect(data.length).toBe(1);
  });
});
