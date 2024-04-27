import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { UsersModule } from 'src/users/users.module';
import { UnauthorizedException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';

describe('AuthController', () => {
  let jwt: JwtService;
  let guard: AuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
        AuthGuard,
      ],

      imports: [UsersModule, JwtModule],
    }).compile();

    jwt = module.get<JwtService>(JwtService);
    guard = module.get<AuthGuard>(AuthGuard);
  });

  it('passes with valid credentials', async () => {
    //expect(controller).toBeDefined();
    /*let context = {
      switchToHttp: () => {
        getRequest: () => new Request('http://localhost/login');
      },
    };
    jest
      .spyOn(jwt, 'verifyAsync')
      .mockResolvedValue({ username: 'alice', sub: '123' });
    const response = await guard.canActivate(context);
    expect(response.access_token).toEqual('asdasdad');*/
  });
});
