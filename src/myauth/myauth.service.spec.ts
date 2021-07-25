import { Test, TestingModule } from '@nestjs/testing';
import { MyauthService } from './myauth.service';

describe('MyauthService', () => {
  let service: MyauthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyauthService],
    }).compile();

    service = module.get<MyauthService>(MyauthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
