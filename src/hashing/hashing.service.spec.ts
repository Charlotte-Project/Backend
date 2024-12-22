import { Test, TestingModule } from '@nestjs/testing';
import { HashingService } from '~/hashing/hashing.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('Hashing service', () => {
  let service: HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashingService],
    }).compile();

    service = module.get<HashingService>(HashingService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Hash', () => {
    it('Should hash the given data with the provided salt', async () => {
      const data = 'hello world';
      const salt = 10;
      const hashedData = 'hashedData';

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedData);

      const result = await service.hash(data, salt);
      expect(result).toBe(hashedData);
      expect(bcrypt.hash).toHaveBeenCalledWith(data, salt);
    });
  });

  describe('Compare', () => {
    it('Should return true if password matches the hash', async () => {
      const password = 'password';
      const hash = 'hash';

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.compare(password, hash);
      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
    });
    it('Should return false if password does not match the hash', async () => {
      const password = 'password';
      const hash = 'hash';

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.compare(password, hash);
      expect(result).toBe(false);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
    });
  });
});
