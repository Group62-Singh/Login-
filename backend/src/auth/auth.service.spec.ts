import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let user: UsersService;
  let jwt: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
      imports: [UsersModule, JwtModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
    user = module.get<UsersService>(UsersService);
    jwt = module.get<JwtService>(JwtService);
  });

  it('should be defined', async () => {
    jest.spyOn(user, 'findOne').mockResolvedValue({
      fuelRequests: [],
      password: '123',
      username: 'alice',
      id: '1234',
    } as any);

    jest.spyOn(jwt, 'sign').mockReturnValue('asdas');
    jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);

    const result = await service.signIn('alice', '123');
    expect(result.access_token).toEqual('asdas');
  });
});
