import { ChatModule } from './chat.module';
import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import mailChatDto from './dto/sendMail.dto';
import { provide } from 'vue';
import { getRepositoryToken } from '@nestjs/typeorm';
import Email from 'src/crm/entities/email.entity';

describe('ChatService', () => {
  let service: ChatService;
  const mockEmailRepository = {
    mailAll: jest.fn().mockImplementation((data) => data),
    sendEmailToMembers: jest
      .fn()
      .mockImplementation((dto) =>
        Promise.resolve({ recipientId: Date.now(), ...dto }),
      ),
  };

  //include the getRepositoryToken for mocking repositories  and the "useValue to mock the repo"
  //Remove the imports:[Module name]
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        { provide: getRepositoryToken(Email), useValue: mockEmailRepository },
      ],
    }).compile();

    service = await module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
