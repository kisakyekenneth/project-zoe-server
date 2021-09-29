import { Response } from 'express';
import { EventsRegistrationController } from './event-registration.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { EventRegistrationService } from './event-registration.service';
import EventRegistartion from './dto/event-registration.dto';

describe('EventRegistration', () => {
  let service: EventRegistrationService;

  let controller: EventsRegistrationController;

  const mockEventRegistrationService = {
    create: jest.fn().mockImplementation((data) => {
      return {
        contactId: Math.floor(Math.random() * 10),
        eventId: Math.floor(Math.random() * 10),
      };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsRegistrationController],
      providers: [EventRegistrationService],
    })
      .overrideProvider(EventRegistrationService)
      .useValue(mockEventRegistrationService)
      .compile();

    controller = module.get<EventsRegistrationController>(
      EventsRegistrationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return registration details', async () => {
    const data: EventRegistartion = {
      eventId: Math.floor(Math.random() * 10),
      event: Math.floor(Math.random() * 10),
      contact: Math.floor(Math.random() * 10),
      contactId: Math.floor(Math.random() * 10),
    };
    const result = await controller.create(data);
    const response = {
      eventId: expect.any(Number),
      contactId: expect.any(Number),
    };
    console.log('Result', result);
    console.log('Response', response);
    expect(result).toEqual(response);
  });
  // it('should pass with wrong parameters', async () => {
  //   expect(controller).toBeDefined();
  // });
});
