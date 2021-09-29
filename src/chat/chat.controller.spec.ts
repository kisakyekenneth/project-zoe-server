import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import mailChatDto from './dto/sendMail.dto';

describe('ChatController', () => {
  let service: ChatService;

  let controller: ChatController;

  const mockChatService = {
    mailAll: jest.fn().mockImplementation((createEmailDto: mailChatDto) => {
      return { createEmailDto };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [ChatService],
    })
      .overrideProvider(ChatService)
      .useValue(mockChatService)
      .compile();

    controller = module.get<ChatController>(ChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Email sending', async () => {
    const data: mailChatDto = {
      subject: 'Written test for Email Sending',
      body:
        'Test for the sending of an email, If you see this then the test has passed',
      recipientId: [4, 5],
    };
    expect(controller.create(data));

    expect(mockChatService.mailAll).toHaveBeenCalledWith(data);
  });
});
